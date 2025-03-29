
import { useState } from "react";
import { ArrowRight, PiggyBank, Calculator, Briefcase, TrendingUp, Sliders } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { investmentAccounts, investmentGrowthData } from "@/data/mockData";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ['#1e40af', '#0369a1', '#059669'];

const Investments = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(30);
  const [interestRate, setInterestRate] = useState(8);
  const [projectionData, setProjectionData] = useState(investmentGrowthData);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };
  
  // Total portfolio value
  const totalPortfolioValue = investmentAccounts.reduce((sum, account) => sum + account.balance, 0);
  
  // Calculate projections (simplified for this demo)
  const calculateProjections = () => {
    const data = [];
    let balance = initialInvestment;
    
    for (let year = 0; year <= years; year += 5) {
      data.push({
        year,
        value: Math.round(balance)
      });
      
      // Calculate next 5 years of growth
      const yearlyContribution = monthlyContribution * 12;
      for (let i = 0; i < 5; i++) {
        balance = (balance + yearlyContribution) * (1 + interestRate / 100);
      }
    }
    
    setProjectionData(data);
  };
  
  // Calculate final value for display
  const finalValue = projectionData[projectionData.length - 1]?.value || 0;
  const totalContributions = initialInvestment + (monthlyContribution * 12 * years);
  const totalGrowth = finalValue - totalContributions;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Investment Planning</h1>
        <div className="flex items-center space-x-2">
          <Button>
            <PiggyBank className="mr-2 h-4 w-4" />
            New Investment Goal
          </Button>
        </div>
      </div>
      
      {/* Portfolio Summary */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {investmentAccounts.map((account, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(account.balance)}</div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">YTD Return</p>
                <p className="text-xs font-medium text-finance-success">+{account.performance.yearly}%</p>
              </div>
              <div className="mt-3">
                <div className="text-xs text-muted-foreground mb-1">Asset Allocation</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-finance-primary rounded-full mr-1"></div>
                    <span>Stocks: {account.allocation.stocks}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-finance-secondary rounded-full mr-1"></div>
                    <span>Bonds: {account.allocation.bonds}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-finance-accent rounded-full mr-1"></div>
                    <span>Cash: {account.allocation.cash}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPortfolioValue)}</div>
            <div className="text-xs text-muted-foreground mt-2">Asset Allocation</div>
            <div className="h-[80px] mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Stocks', value: 75 },
                      { name: 'Bonds', value: 20 },
                      { name: 'Cash', value: 5 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={35}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-1 text-xs mt-1">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-finance-primary rounded-full mr-1"></div>
                <span>Stocks: 75%</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-finance-secondary rounded-full mr-1"></div>
                <span>Bonds: 20%</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-finance-accent rounded-full mr-1"></div>
                <span>Cash: 5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Investment Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Investment Growth Calculator
          </CardTitle>
          <CardDescription>
            Project your investment growth over time based on different parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="space-y-4">
            <TabsList>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="chart">Growth Chart</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
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
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="years-slider">Investment Period: {years} years</Label>
                    <span className="text-xs text-muted-foreground">1 - 50 years</span>
                  </div>
                  <Slider
                    id="years-slider"
                    defaultValue={[years]}
                    min={1}
                    max={50}
                    step={1}
                    onValueChange={(value) => setYears(value[0])}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="interest-slider">Expected Annual Return: {interestRate}%</Label>
                    <span className="text-xs text-muted-foreground">1% - 15%</span>
                  </div>
                  <Slider
                    id="interest-slider"
                    defaultValue={[interestRate]}
                    min={1}
                    max={15}
                    step={0.5}
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <Button onClick={calculateProjections} className="w-full">
                Calculate Investment Growth
              </Button>
            </TabsContent>
            
            <TabsContent value="chart">
              <div className="h-[400px]">
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
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Initial Investment</h4>
                  <p className="text-lg font-bold mt-1">{formatCurrency(initialInvestment)}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Total Contributions</h4>
                  <p className="text-lg font-bold mt-1">{formatCurrency(totalContributions)}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Investment Growth</h4>
                  <p className="text-lg font-bold mt-1 text-finance-success">{formatCurrency(totalGrowth)}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="breakdown">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Final Value Breakdown</CardTitle>
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
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Figures</CardTitle>
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
                          <p className="font-bold text-lg text-finance-primary">{formatCurrency(finalValue)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Strategy Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="bg-finance-primary/10 p-2 rounded-full text-finance-primary">
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
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-finance-accent/10 p-2 rounded-full text-finance-accent">
                          <Sliders className="h-4 w-4" />
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
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-finance-secondary/10 p-2 rounded-full text-finance-secondary">
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
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investments;
