
import { useState, useEffect } from "react";
import { 
  LineChart, 
  Search, 
  TrendingDown, 
  TrendingUp, 
  Plus, 
  Info, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight,
  X
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stockWatchlist } from "@/data/mockData";
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { toast } from "sonner";
import { 
  searchStocks, 
  getStockQuote, 
  getHistoricalData, 
  StockQuote, 
  StockSearchResult,
  StockHistoricalData
} from "@/services/alphaVantageService";
import { useQuery } from "@tanstack/react-query";

type TimeFrame = "1D" | "1W" | "1M" | "3M" | "1Y";

// Convert watchlist items to match our StockQuote interface
const initialWatchlist: StockQuote[] = stockWatchlist.map(stock => ({
  symbol: stock.symbol,
  name: stock.name,
  price: stock.price,
  change: stock.change,
  changePercent: stock.changePercent,
  high: stock.price * 1.02, // Mocked data
  low: stock.price * 0.98,  // Mocked data
  volume: 1000000,          // Mocked data
  latestTradingDay: new Date().toISOString().split('T')[0],
}));

const Stocks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StockSearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [watchlist, setWatchlist] = useState<StockQuote[]>(initialWatchlist);
  const [selectedStock, setSelectedStock] = useState<StockQuote | null>(watchlist[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>("1M");
  
  // Fetch stock data when a stock is selected
  const { data: historicalData, isLoading: isLoadingHistorical, refetch: refetchHistorical } = useQuery({
    queryKey: ['stockHistorical', selectedStock?.symbol, selectedTimeframe],
    queryFn: () => selectedStock ? getHistoricalData(selectedStock.symbol) : Promise.resolve([]),
    enabled: !!selectedStock,
  });
  
  // Search for stocks as user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        const results = await searchStocks(searchQuery);
        setSearchResults(results);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const handleSelectStock = async (stock: StockQuote) => {
    setSelectedStock(stock);
  };
  
  const handleSelectSearchResult = async (result: StockSearchResult) => {
    setShowSearchResults(false);
    setSearchQuery("");
    
    try {
      const quote = await getStockQuote(result.symbol);
      if (quote) {
        quote.name = result.name;
        setSelectedStock(quote);
        
        // Check if already in watchlist
        if (!watchlist.some(item => item.symbol === quote.symbol)) {
          toast.success(`Added ${result.symbol} to watchlist`);
          setWatchlist(prev => [...prev, quote]);
        }
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      toast.error("Failed to fetch stock data");
    }
  };
  
  const refreshStockData = async () => {
    if (!selectedStock) return;
    
    toast.info(`Refreshing data for ${selectedStock.symbol}...`);
    
    try {
      const quote = await getStockQuote(selectedStock.symbol);
      if (quote) {
        quote.name = selectedStock.name;
        setSelectedStock(quote);
        
        // Also update watchlist
        setWatchlist(prev => 
          prev.map(item => item.symbol === quote.symbol ? { ...quote, name: item.name } : item)
        );
        
        // Refresh chart data
        refetchHistorical();
        
        toast.success(`Data refreshed for ${selectedStock.symbol}`);
      }
    } catch (error) {
      console.error("Error refreshing stock data:", error);
      toast.error("Failed to refresh stock data");
    }
  };
  
  const addToWatchlist = () => {
    if (!selectedStock) return;
    
    if (watchlist.some(item => item.symbol === selectedStock.symbol)) {
      toast.info(`${selectedStock.symbol} is already in your watchlist`);
      return;
    }
    
    setWatchlist(prev => [...prev, selectedStock]);
    toast.success(`Added ${selectedStock.symbol} to watchlist`);
  };
  
  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(item => item.symbol !== symbol));
    toast.success(`Removed ${symbol} from watchlist`);
    
    // If the selected stock was removed, select the first one in the list
    if (selectedStock?.symbol === symbol) {
      const updatedWatchlist = watchlist.filter(item => item.symbol !== symbol);
      setSelectedStock(updatedWatchlist.length > 0 ? updatedWatchlist[0] : null);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Stock Research</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for stocks..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                    onClick={() => handleSelectSearchResult(result)}
                  >
                    <div>
                      <div className="font-medium">{result.symbol}</div>
                      <div className="text-xs text-muted-foreground">{result.name}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{result.region}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button onClick={refreshStockData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Stock Detail Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedStock?.symbol || "Select a stock"}
                {selectedStock?.name && (
                  <span className="text-base font-normal text-muted-foreground">
                    {selectedStock.name}
                  </span>
                )}
              </CardTitle>
              <CardDescription>Stock Price History</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={selectedTimeframe === "1D" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("1D")}
              >
                1D
              </Button>
              <Button 
                variant={selectedTimeframe === "1W" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("1W")}
              >
                1W
              </Button>
              <Button 
                variant={selectedTimeframe === "1M" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("1M")}
              >
                1M
              </Button>
              <Button 
                variant={selectedTimeframe === "3M" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("3M")}
              >
                3M
              </Button>
              <Button 
                variant={selectedTimeframe === "1Y" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("1Y")}
              >
                1Y
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {selectedStock ? (
                isLoadingHistorical ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Loading chart data...</p>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart 
                      data={historicalData || []}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        tickFormatter={(value) => formatCurrency(value)}
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => formatCurrency(value as number)}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString();
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#1e40af" 
                        dot={false}
                        strokeWidth={2}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                )
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Search for a stock to view chart</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{selectedStock?.symbol || "Select a stock"}</CardTitle>
            <CardDescription>{selectedStock?.name || "Search for a stock to view details"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedStock ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Price</span>
                  <span className="text-lg font-bold">{formatCurrency(selectedStock.price)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Today's Change</span>
                  <div className="flex items-center gap-1">
                    {selectedStock.change > 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-finance-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-finance-danger" />
                    )}
                    <span 
                      className={
                        selectedStock.change > 0 
                          ? "text-finance-success" 
                          : "text-finance-danger"
                      }
                    >
                      {formatCurrency(Math.abs(selectedStock.change))} ({Math.abs(selectedStock.changePercent).toFixed(2)}%)
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <h4 className="text-sm font-medium">Key Statistics</h4>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Volume</span>
                    <span className="text-xs font-medium">{selectedStock.volume.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Day's High</span>
                    <span className="text-xs font-medium">{formatCurrency(selectedStock.high)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Day's Low</span>
                    <span className="text-xs font-medium">{formatCurrency(selectedStock.low)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Latest Trading Day</span>
                    <span className="text-xs font-medium">{selectedStock.latestTradingDay}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2" />
                <p>Search for a stock to view details</p>
              </div>
            )}
          </CardContent>
          {selectedStock && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={addToWatchlist}>
                <Plus className="mr-2 h-4 w-4" />
                Add to Watchlist
              </Button>
              <Button size="sm">
                View Details
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      
      {/* Watchlist Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Stock Watchlist
          </CardTitle>
          <CardDescription>
            Track and monitor your favorite stocks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">% Change</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.length > 0 ? (
                watchlist.map((stock, index) => (
                  <TableRow 
                    key={index} 
                    onClick={() => handleSelectStock(stock)} 
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(stock.price)}</TableCell>
                    <TableCell className="text-right">
                      <span 
                        className={
                          stock.change > 0 
                            ? "text-finance-success" 
                            : "text-finance-danger"
                        }
                      >
                        {stock.change > 0 ? "+" : ""}{formatCurrency(stock.change)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {stock.changePercent > 0 ? (
                          <TrendingUp className="h-4 w-4 text-finance-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-finance-danger" />
                        )}
                        <span 
                          className={
                            stock.changePercent > 0 
                              ? "text-finance-success" 
                              : "text-finance-danger"
                          }
                        >
                          {stock.changePercent > 0 ? "+" : ""}{Math.abs(stock.changePercent).toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle info button click
                        }}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWatchlist(stock.symbol);
                        }}
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No stocks in watchlist. Search for stocks to add them.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Disclaimer */}
      <div className="text-xs text-muted-foreground">
        <p>
          <strong>Disclaimer:</strong> Stock data provided by Alpha Vantage API. 
          All stock information is provided for educational purposes only and 
          should not be considered as financial advice. Past performance does not guarantee future results. 
          Always conduct your own research or consult with a financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default Stocks;
