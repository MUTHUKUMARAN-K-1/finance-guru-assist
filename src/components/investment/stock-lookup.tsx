
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getStockQuote, getHistoricalData } from "@/services/alphaVantageService";

const StockLookup = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const handleLookup = async () => {
    if (!symbol.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const quoteData = await getStockQuote(symbol);
      if (!quoteData) {
        throw new Error("Unable to fetch stock data");
      }
      setStockData(quoteData);
    } catch (err) {
      setError("Error fetching stock data. Please try again or check the symbol.");
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Sample data for demonstration
  const demoChartData = [
    { date: 'Jan', price: 45.42 },
    { date: 'Feb', price: 47.31 },
    { date: 'Mar', price: 46.89 },
    { date: 'Apr', price: 49.72 },
    { date: 'May', price: 51.63 },
    { date: 'Jun', price: 50.18 },
    { date: 'Jul', price: 53.96 },
    { date: 'Aug', price: 55.74 },
    { date: 'Sep', price: 54.31 },
    { date: 'Oct', price: 56.87 },
    { date: 'Nov', price: 58.92 },
    { date: 'Dec', price: 60.15 },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Search className="mr-2 h-5 w-5" />
            Stock Lookup Tool
          </CardTitle>
          <CardDescription>
            Get basic information and performance data for a publicly traded company
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="symbol" className="sr-only">Stock Symbol</Label>
              <Input
                id="symbol"
                placeholder="Enter stock symbol (e.g., AAPL, MSFT, AMZN)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleLookup} 
              disabled={loading || !symbol.trim()}
            >
              {loading ? "Searching..." : "Look Up"}
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {/* Show demo data */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Apple Inc (AAPL)</CardTitle>
            <CardDescription>Technology - Consumer Electronics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Price</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold">$189.45</span>
                  <span className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +1.42%
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="font-medium">$2.94T</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Volume</p>
                  <p className="font-medium">48.2M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">P/E Ratio</p>
                  <p className="font-medium">32.14</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dividend Yield</p>
                  <p className="font-medium">0.51%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">52 Week High</p>
                  <p className="font-medium">$199.62</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">52 Week Low</p>
                  <p className="font-medium">$124.17</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Price History (12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={demoChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, 'Price']} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#1e40af" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>About Apple Inc.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod.
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground mt-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last updated: August 18, 2023</span>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 text-xs text-muted-foreground">
          Data shown is for demonstration purposes only. For accurate stock information, please look up the actual stock symbol.
        </CardFooter>
      </Card>
    </div>
  );
};

export default StockLookup;
