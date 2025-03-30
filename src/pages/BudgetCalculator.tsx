
import { useState, useEffect } from "react";
import { Calculator, DollarSign, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { toast } from "@/components/ui/use-toast";

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Budget Planning</h1>
        <p className="text-sm text-muted-foreground">Create and manage your personal budget to achieve financial goals</p>
      </div>
      
      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator" className="flex gap-2 items-center">
            <Calculator className="h-4 w-4" />
            Budget Calculator
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex gap-2 items-center">
            <PieChart className="h-4 w-4" />
            Budgeting Tips
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-4">
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
                      <Label htmlFor="income">Monthly Income (after tax)</Label>
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
                      <Label htmlFor="housing">Housing (rent/mortgage, utilities, etc.)</Label>
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
        </TabsContent>
        
        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>Budgeting Tips</CardTitle>
              <CardDescription>
                Practical advice to improve your financial management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">The 50/30/20 Rule</h3>
                <p className="text-muted-foreground">
                  A simple budgeting method that allocates your after-tax income:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">50% - Needs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Essential expenses like housing, groceries, utilities, transportation, and minimum debt payments.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">30% - Wants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Non-essential expenses that improve your life like dining out, entertainment, hobbies, and subscriptions.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">20% - Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Money for building emergency funds, retirement contributions, debt repayment beyond minimums, and other financial goals.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="pt-4 space-y-4">
                <h3 className="text-lg font-medium">Effective Budgeting Strategies</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-3 mt-0.5 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Track Your Spending</h4>
                      <p className="text-sm text-muted-foreground">
                        Use apps or spreadsheets to record all expenses for at least 30 days to identify spending patterns and areas for improvement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-3 mt-0.5 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Zero-Based Budgeting</h4>
                      <p className="text-sm text-muted-foreground">
                        Assign every dollar of income a specific purpose until your income minus your expenses equals zero.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-3 mt-0.5 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Pay Yourself First</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically transfer a set amount to savings as soon as you receive income, before paying bills or other expenses.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-3 mt-0.5 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Use the Envelope System</h4>
                      <p className="text-sm text-muted-foreground">
                        Allocate cash into different envelopes for various spending categories to limit overspending (can also be done digitally).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-3 mt-0.5 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Review and Adjust Regularly</h4>
                      <p className="text-sm text-muted-foreground">
                        Set a monthly date to review your budget, track progress, and make adjustments based on changing financial situations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetCalculator;
