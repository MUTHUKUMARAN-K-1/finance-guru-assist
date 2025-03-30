
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CustomTooltip } from "@/components/ui/custom-tooltip";
import { InfoIcon, Calculator } from "lucide-react";
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

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(30);
  const [interestRate, setInterestRate] = useState(8);
  const [projectionData, setProjectionData] = useState<{ year: number; value: number }[]>([]);
  const [showChart, setShowChart] = useState(false);
  
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
  
  const calculateProjections = () => {
    const data = [];
    let balance = initialInvestment;
    
    for (let year = 0; year <= years; year += 5) {
      data.push({
        year,
        value: Math.round(balance)
      });
      
      // Calculate next 5 years of growth (or less if at the end)
      const yearsToCalculate = Math.min(5, years - year);
      if (yearsToCalculate <= 0) break;
      
      const yearlyContribution = monthlyContribution * 12;
      for (let i = 0; i < yearsToCalculate; i++) {
        balance = (balance + yearlyContribution) * (1 + interestRate / 100);
      }
    }
    
    setProjectionData(data);
    setShowChart(true);
  };
  
  // Calculate final values for display
  const finalValue = projectionData.length > 0 ? projectionData[projectionData.length - 1].value : 0;
  const totalContributions = initialInvestment + (monthlyContribution * 12 * years);
  const totalGrowth = finalValue - totalContributions;
  
  // Initial calculation on first render
  useEffect(() => {
    calculateProjections();
  }, []);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Calculator className="mr-2 h-5 w-5" />
            Investment Growth Calculator
          </CardTitle>
          <CardDescription>
            Project your investment growth over time based on different parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="initial-investment">Initial Investment</Label>
                <CustomTooltip content="The amount you start with in your investment account">
                  <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                </CustomTooltip>
              </div>
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">$</span>
                <Input
                  id="initial-investment"
                  type="number"
                  min="0"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                <CustomTooltip content="How much you'll add to your investment each month">
                  <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                </CustomTooltip>
              </div>
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">$</span>
                <Input
                  id="monthly-contribution"
                  type="number"
                  min="0"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="years-slider">Investment Period: {years} years</Label>
                <span className="text-xs text-muted-foreground">1 - 50 years</span>
              </div>
              <Slider
                id="years-slider"
                defaultValue={[years]}
                value={[years]}
                min={1}
                max={50}
                step={1}
                onValueChange={(value) => setYears(value[0])}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="interest-slider">Expected Annual Return: {interestRate}%</Label>
                <span className="text-xs text-muted-foreground">1% - 15%</span>
              </div>
              <Slider
                id="interest-slider"
                defaultValue={[interestRate]}
                value={[interestRate]}
                min={1}
                max={15}
                step={0.5}
                onValueChange={(value) => setInterestRate(value[0])}
              />
            </div>
          </div>
          
          <Button onClick={calculateProjections} className="w-full">
            Calculate Investment Growth
          </Button>
        </CardContent>
      </Card>
      
      {showChart && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Growth Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={projectionData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
                  <p className="text-lg font-bold mt-1 text-green-600">{formatCurrency(totalGrowth)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Final Value Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[250px]">
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
                    <p className="font-bold text-lg text-blue-800">{formatCurrency(finalValue)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Investment Strategy Tip</h3>
                <p className="text-sm text-blue-700">
                  For a {years}-year investment horizon, consider a diversified portfolio with
                  {years > 20 ? " 80-90% stocks and 10-20% bonds." : 
                   years > 10 ? " 70-80% stocks and 20-30% bonds." : 
                   " 60-70% stocks and 30-40% bonds."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
