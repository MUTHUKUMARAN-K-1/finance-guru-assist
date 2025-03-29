
import { toast } from "sonner";

const ALPHA_VANTAGE_API_KEY = "KS95G82D1EQSGP66";
const BASE_URL = "https://www.alphavantage.co/query";

export interface StockQuote {
  symbol: string;
  name?: string; // We'll add this from the search results
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  latestTradingDay: string;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

interface AlphaVantageGlobalQuoteResponse {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
}

interface AlphaVantageSearchResponse {
  bestMatches: Array<{
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
  }>;
}

interface HistoricalDataPoint {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface AlphaVantageTimeSeriesResponse {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

export interface StockHistoricalData {
  date: string;
  price: number;
}

export const searchStocks = async (query: string): Promise<StockSearchResult[]> => {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to search stocks");
    }
    
    const data = await response.json() as AlphaVantageSearchResponse;
    
    if (!data.bestMatches) {
      return [];
    }
    
    return data.bestMatches.map((match) => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
      type: match["3. type"],
      region: match["4. region"],
      marketOpen: match["5. marketOpen"],
      marketClose: match["6. marketClose"],
      timezone: match["7. timezone"],
      currency: match["8. currency"],
      matchScore: match["9. matchScore"],
    }));
  } catch (error) {
    console.error("Error searching stocks:", error);
    toast.error("Failed to search stocks. Please try again later.");
    return [];
  }
};

export const getStockQuote = async (symbol: string): Promise<StockQuote | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch stock quote");
    }
    
    const data = await response.json() as AlphaVantageGlobalQuoteResponse;
    
    if (!data["Global Quote"] || !data["Global Quote"]["01. symbol"]) {
      return null;
    }
    
    const quote = data["Global Quote"];
    
    return {
      symbol: quote["01. symbol"],
      price: parseFloat(quote["05. price"]),
      change: parseFloat(quote["09. change"]),
      changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
      high: parseFloat(quote["03. high"]),
      low: parseFloat(quote["04. low"]),
      volume: parseInt(quote["06. volume"], 10),
      latestTradingDay: quote["07. latest trading day"],
    };
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    toast.error("Failed to fetch stock quote. Please try again later.");
    return null;
  }
};

export const getHistoricalData = async (symbol: string, timeframe = 'daily'): Promise<StockHistoricalData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_${timeframe.toUpperCase()}&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch historical data");
    }
    
    const data = await response.json() as AlphaVantageTimeSeriesResponse;
    
    if (!data["Time Series (Daily)"]) {
      return [];
    }
    
    const timeSeriesData = data["Time Series (Daily)"];
    
    return Object.entries(timeSeriesData)
      .map(([date, values]) => ({
        date,
        price: parseFloat(values["4. close"]),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30); // Last 30 days
  } catch (error) {
    console.error("Error fetching historical data:", error);
    toast.error("Failed to fetch historical data. Please try again later.");
    return [];
  }
};
