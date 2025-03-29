
import { useState } from "react";
import { 
  LineChart, 
  Search, 
  TrendingDown, 
  TrendingUp, 
  Plus, 
  Info, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight 
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

// Sample historical data for chart
const sampleStockData = [
  { date: "1/1", price: 160.50 },
  { date: "1/2", price: 162.30 },
  { date: "1/3", price: 165.80 },
  { date: "1/4", price: 164.20 },
  { date: "1/5", price: 167.50 },
  { date: "1/6", price: 169.80 },
  { date: "1/7", price: 171.20 },
  { date: "1/8", price: 173.60 },
  { date: "1/9", price: 175.40 },
  { date: "1/10", price: 174.30 },
  { date: "1/11", price: 176.80 },
  { date: "1/12", price: 178.20 },
  { date: "1/13", price: 180.60 },
  { date: "1/14", price: 182.25 },
];

const Stocks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState(stockWatchlist[0]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const handleSelectStock = (stock: typeof stockWatchlist[0]) => {
    setSelectedStock(stock);
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
          </div>
          <Button>
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
                {selectedStock.symbol}
                <span className="text-base font-normal text-muted-foreground">
                  {selectedStock.name}
                </span>
              </CardTitle>
              <CardDescription>Stock Price History</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">1D</Button>
              <Button variant="outline" size="sm">1W</Button>
              <Button variant="outline" size="sm">1M</Button>
              <Button variant="outline" size="sm">3M</Button>
              <Button variant="outline" size="sm">1Y</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={sampleStockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis 
                    domain={['dataMin - 5', 'dataMax + 5']} 
                    tickFormatter={(value) => formatCurrency(value)}
                    width={80}
                  />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#1e40af" 
                    dot={false}
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{selectedStock.symbol}</CardTitle>
            <CardDescription>{selectedStock.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <span className="text-xs text-muted-foreground">Market Cap</span>
                <span className="text-xs font-medium">$2.85T</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">P/E Ratio</span>
                <span className="text-xs font-medium">30.24</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Dividend Yield</span>
                <span className="text-xs font-medium">0.51%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">52-Week High</span>
                <span className="text-xs font-medium">$198.23</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">52-Week Low</span>
                <span className="text-xs font-medium">$124.17</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add to Watchlist
            </Button>
            <Button size="sm">
              View Details
            </Button>
          </CardFooter>
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
              {stockWatchlist.map((stock, index) => (
                <TableRow key={index} onClick={() => handleSelectStock(stock)} className="cursor-pointer hover:bg-muted/50">
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
                        {stock.changePercent > 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Disclaimer */}
      <div className="text-xs text-muted-foreground">
        <p>
          <strong>Disclaimer:</strong> All stock information is provided for educational purposes only and 
          should not be considered as financial advice. Past performance does not guarantee future results. 
          Always conduct your own research or consult with a financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default Stocks;
