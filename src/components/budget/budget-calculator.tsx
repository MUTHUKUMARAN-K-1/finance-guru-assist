
import { useState, useEffect } from "react";
import { Calculator, DollarSign, PieChart, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { toast } from "@/components/ui/use-toast";
import { CustomTooltip } from "@/components/ui/custom-tooltip";

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const BudgetCalculator = () => {
  const [income, setIncome] = useState<number>(4000);
  const [housing, setHousing] = useState<number>(1200);
  const [transportation, setTransportation] = useState<number>(350);
  const [food, setFood] = useState<number>(600);
  const [other, setOther] = useState<number>(850);
  const [remaining, setRemaining] = useState<number>(0);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  // Handle budget calculation
  const calculateBudget = () => {
    const expenses = housing + transportation + food + other;
    const remainingAmount = income - expenses;
    setTotalExpenses(expenses);
    setRemaining(remainingAmount);

    // Create data for pie chart
    const categories: ExpenseCategory[] = [
      { 
        name: 'Housing', 
        amount: housing,
        percentage: (housing / income) * 100,
        color: COLORS[0]
      },
      { 
        name: 'Transport', 
        amount: transportation,
        percentage: (transportation / income) * 100,
        color: COLORS[1]
      },
      { 
        name: 'Food', 
        amount: food,
        percentage: (food / income) * 100,
        color: COLORS[2]
      },
      { 
        name: 'Other', 
        amount: other,
        percentage: (other / income) * 100,
        color: COLORS[3]
      },
      { 
        name: 'Remaining', 
        amount: remainingAmount,
        percentage: (remainingAmount / income) * 100,
        color: COLORS[4]
      }
    ];

    setExpenseCategories(categories);

    // Show toast notification
    toast({
      title: "Budget Calculated",
      description: `You have $${remainingAmount.toFixed(2)} remaining for savings and other goals.`,
    });
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Generate budget recommendations
  const getBudgetRecommendations = () => {
    const recommendations = [];
    
    // Emergency fund recommendation
    if (remaining > 0) {
      const emergencyFundAmount = Math.min(remaining * 0.5, 500);
      recommendations.push({
        title: "Emergency Fund",
        description: `Consider saving ${formatCurrency(emergencyFundAmount)} in an emergency fund`,
        priority: "high"
      });
    }
    
    // Retirement savings recommendation
    if (remaining > 500) {
      const retirementAmount = Math.min(remaining * 0.3, 300);
      recommendations.push({
        title: "Retirement Savings",
        description: `Allocate ${formatCurrency(retirementAmount)} toward retirement accounts`,
        priority: "medium"
      });
    }
    
    // Housing cost recommendation
    if (housing > income * 0.3) {
      recommendations.push({
        title: "Housing Costs",
        description: "Your housing costs exceed 30% of your income. Consider ways to reduce this expense.",
        priority: "high"
      });
    }
    
    // Additional debt payoff or saving recommendation
    if (remaining > 800) {
      recommendations.push({
        title: "Debt Payoff",
        description: "With your remaining budget, consider paying down high-interest debt or increasing retirement savings.",
        priority: "medium"
      });
    }
    
    // No recommendations case
    if (recommendations.length === 0 && remaining > 0) {
      recommendations.push({
        title: "Great Budget Balance",
        description: "Your budget looks well-balanced! Continue maintaining your current financial habits.",
        priority: "low"
      });
    }
    
    // Negative budget warning
    if (remaining < 0) {
      recommendations.push({
        title: "Budget Deficit",
        description: "Your expenses exceed your income. Find ways to reduce expenses or increase income.",
        priority: "critical"
      });
    }
    
    return recommendations;
  };
  
  // Calculate budget on initial load
  useEffect(() => {
    calculateBudget();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Budget Calculator</CardTitle>
        </div>
        <CardDescription>
          Enter your monthly income and expenses to calculate your budget
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Monthly Income & Expenses</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="income">Monthly Income (after tax)</Label>
                  <CustomTooltip content="Your total take-home pay after taxes and deductions">
                    <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                  </CustomTooltip>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="income"
                    type="number"
                    className="pl-7"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="housing">Housing (rent/mortgage, utilities, etc.)</Label>
                  <CustomTooltip content="Include rent/mortgage, utilities, internet, property taxes, etc.">
                    <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                  </CustomTooltip>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="housing"
                    type="number"
                    className="pl-7"
                    value={housing}
                    onChange={(e) => setHousing(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transportation">Transportation</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="transportation"
                    type="number"
                    className="pl-7"
                    value={transportation}
                    onChange={(e) => setTransportation(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="food">Food & Groceries</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="food"
                    type="number"
                    className="pl-7"
                    value={food}
                    onChange={(e) => setFood(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="other">Other Expenses</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input
                    id="other"
                    type="number"
                    className="pl-7"
                    value={other}
                    onChange={(e) => setOther(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <Button 
                onClick={calculateBudget}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Calculate Budget
              </Button>
            </div>
          </div>
          
          {/* Right Column - Results */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Budget Breakdown</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Total Income:</span>
                <span className="font-bold text-lg">{formatCurrency(income)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Total Expenses:</span>
                <span className="font-bold text-lg">{formatCurrency(totalExpenses)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Remaining:</span>
                <span className={`font-bold text-lg ${remaining < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {formatCurrency(remaining)}
                </span>
              </div>
            </div>
            
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expenseCategories}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Recommendations Section */}
        {remaining !== undefined && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">Recommendations:</h3>
            <div className="space-y-3">
              {getBudgetRecommendations().map((recommendation, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md ${
                    recommendation.priority === 'critical' ? 'bg-red-50 border border-red-200' :
                    recommendation.priority === 'high' ? 'bg-orange-50 border border-orange-200' :
                    recommendation.priority === 'medium' ? 'bg-blue-50 border border-blue-200' :
                    'bg-green-50 border border-green-200'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`mt-0.5 p-1 rounded-full mr-2 ${
                      recommendation.priority === 'critical' ? 'bg-red-100 text-red-600' :
                      recommendation.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                      recommendation.priority === 'medium' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {recommendation.priority === 'critical' ? (
                          <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>
                        ) : (
                          <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>
                        )}
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">{recommendation.title}</div>
                      <div className="text-sm text-muted-foreground">{recommendation.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetCalculator;
