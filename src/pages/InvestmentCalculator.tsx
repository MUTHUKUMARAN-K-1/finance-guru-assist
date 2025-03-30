
import { useState, useEffect } from "react";
import { Calculator, PiggyBank, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { toast } from "@/components/ui/use-toast";

const COLORS = ['#1e40af', '#0369a1', '#059669'];

interface DataPoint {
  year: number;
  value: number;
}

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [years, setYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [projectionData, setProjectionData] = useState<DataPoint[]>([]);
  const [finalValue, setFinalValue] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalGrowth, setTotalGrowth] = useState<number>(0);
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Format percentage for display
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };
  
  // Calculate investment projections
  const calculateProjections = () => {
    const data: DataPoint[] = [];
    let balance = initialInvestment;
    const yearlyContribution = monthlyContribution * 12;
    
    // Calculate for each year
    for (let year = 0; year <= years; year += 5) {
      data.push({
        year,
        value: Math.round(balance)
      });
      
      // Calculate next 5 years of growth (or fewer for final period)
      const yearsToCalculate = Math.min(5, years - year);
      if (yearsToCalculate <= 0) break;
      
      for (let i = 0; i < yearsToCalculate; i++) {
        balance = (balance + yearlyContribution) * (1 + interestRate / 100);
      }
    }
    
    // Make sure the final year is included
    if (years % 5 !== 0 && !data.some(d => d.year === years)) {
      balance = initialInvestment;
      for (let year = 1; year <= years; year++) {
        balance = (balance + yearlyContribution) * (1 + interestRate / 100);
      }
      data.push({
        year: years,
        value: Math.round(balance)
      });
    }
    
    // Sort by year just in case
    data.sort((a, b) => a.year - b.year);
    
    // Calculate final values
    const finalVal = data[data.length - 1].value;
    const totalContrib = initialInvestment + (monthlyContribution * 12 * years);
    const growth = finalVal - totalContrib;
    
    setProjectionData(data);
    setFinalValue(finalVal);
    setTotalContributions(totalContrib);
    setTotalGrowth(growth);
    
    // Show toast notification
    toast({
      title: "Calculation Complete",
      description: `Your investment could grow to ${formatCurrency(finalVal)} over ${years} years.`,
    });
  };
  
  // Calculate initial projections on component mount
  useEffect(() => {
    calculateProjections();
  }, []);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Investment Planning</h1>
        <p className="text-sm text-muted-foreground">Learn how to grow your wealth through smart investing strategies</p>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span>Investment Calculator</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span>Stock Lookup</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <PiggyBank className="h-4 w-4" />
          <span>Investment Basics</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Investment Strategies</span>
        </Button>
      </div>
      
      <Card className="bg-green-50/40 border-green-100">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <CardTitle>Investment Growth Calculator</CardTitle>
          </div>
          <CardDescription>
            Project how your investments could grow over time with compound interest
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Calculator Inputs */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Calculate Your Investment Growth</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="initial-investment">Initial Investment</Label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">$</span>
                    <Input
                      id="initial-investment"
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">$</span>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="years-slider">Investment Period: {years} years</Label>
                    <span className="text-xs text-muted-foreground">1 - 50 years</span>
                  </div>
                  <div className="pt-2">
                    <Slider
                      id="years-slider"
                      defaultValue={[years]}
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={(value) => setYears(value[0])}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 year</span>
                    <span>25 years</span>
                    <span>50 years</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="interest-slider">Expected Annual Return: {interestRate}%</Label>
                    <span className="text-xs text-muted-foreground">1% - 15%</span>
                  </div>
                  <div className="pt-2">
                    <Slider
                      id="interest-slider"
                      defaultValue={[interestRate]}
                      min={1}
                      max={15}
                      step={0.5}
                      onValueChange={(value) => setInterestRate(value[0])}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>7%</span>
                    <span>15%</span>
                  </div>
                </div>
                
                <Button 
                  onClick={calculateProjections} 
                  className="w-full bg-green-600 hover:bg-green-700 mt-2"
                >
                  Calculate Investment Growth
                </Button>
              </div>
            </div>
            
            {/* Right Column - Results */}
            <div className="space-y-6">
              <Tabs defaultValue="chart" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="chart">Growth Chart</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart">
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={projectionData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="year" 
                          label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} 
                        />
                        <YAxis 
                          tickFormatter={(value) => formatCurrency(value)}
                          width={80}
                        />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          name="Projected Value" 
                          stroke="#1e40af" 
                          fill="#1e40af" 
                          fillOpacity={0.3} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="border rounded-md p-3 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground">Initial Investment</h4>
                      <p className="text-lg font-bold">{formatCurrency(initialInvestment)}</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground">Total Contributions</h4>
                      <p className="text-lg font-bold">{formatCurrency(totalContributions)}</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground">Investment Growth</h4>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(totalGrowth)}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="breakdown">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border">
                      <CardHeader>
                        <CardTitle className="text-base">Final Value Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Initial Investment', value: initialInvestment },
                                  { name: 'Contributions', value: totalContributions - initialInvestment },
                                  { name: 'Investment Growth', value: totalGrowth }
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                <Cell fill="#1e40af" />
                                <Cell fill="#0369a1" />
                                <Cell fill="#059669" />
                              </Pie>
                              <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border">
                      <CardHeader>
                        <CardTitle className="text-base">Key Figures</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b pb-2">
                            <p className="text-sm font-medium">Initial Investment</p>
                            <p className="font-bold">{formatCurrency(initialInvestment)}</p>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <p className="text-sm font-medium">Monthly Contribution</p>
                            <p className="font-bold">{formatCurrency(monthlyContribution)}</p>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <p className="text-sm font-medium">Investment Period</p>
                            <p className="font-bold">{years} years</p>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <p className="text-sm font-medium">Annual Return Rate</p>
                            <p className="font-bold">{formatPercentage(interestRate)}</p>
                          </div>
                          <div className="flex justify-between items-center pt-1">
                            <p className="text-sm font-medium">Final Value</p>
                            <p className="font-bold text-lg text-primary">{formatCurrency(finalValue)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="mt-6 border">
                    <CardHeader>
                      <CardTitle className="text-base">Investment Strategy Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-0.5">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Consistent Contributions Matter</h4>
                            <p className="text-sm text-muted-foreground">
                              Regular monthly contributions of {formatCurrency(monthlyContribution)} lead to significant
                              growth over time due to compound interest.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 p-2 rounded-full text-green-600 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Portfolio Allocation</h4>
                            <p className="text-sm text-muted-foreground">
                              For a {years}-year investment horizon, consider a diversified portfolio with
                              {years > 20 ? " 80-90% stocks and 10-20% bonds." : 
                              years > 10 ? " 70-80% stocks and 20-30% bonds." : 
                              " 60-70% stocks and 30-40% bonds."}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 p-2 rounded-full text-purple-600 mt-0.5">
                            <Calculator className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Investment Growth</h4>
                            <p className="text-sm text-muted-foreground">
                              Your initial investment of {formatCurrency(initialInvestment)} could grow to 
                              approximately {formatCurrency(finalValue)} over {years} years, 
                              representing a {formatPercentage((finalValue - initialInvestment) / initialInvestment)} total return.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Explore More Investment Strategies
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;
