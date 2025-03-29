
import { ArrowRight, Banknote, Calendar, Eye, Home, PiggyBank, Plus, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { financialGoals } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Goals = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Map category to icon and color
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'savings':
        return <PiggyBank className="h-5 w-5 text-finance-primary" />;
      case 'property':
        return <Home className="h-5 w-5 text-finance-accent" />;
      case 'debt':
        return <Banknote className="h-5 w-5 text-finance-danger" />;
      case 'leisure':
        return <Calendar className="h-5 w-5 text-finance-info" />;
      default:
        return <Target className="h-5 w-5 text-finance-secondary" />;
    }
  };
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-finance-success";
    if (progress >= 50) return "bg-finance-info";
    if (progress >= 25) return "bg-finance-warning";
    return "bg-finance-danger";
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Financial Goals</h1>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="templates">Goal Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {financialGoals.map((goal, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(goal.category)}
                      <CardTitle>{goal.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Target Date: {goal.deadline}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress 
                      value={goal.progress} 
                      className="h-2"
                      indicatorClassName={getProgressColor(goal.progress)}
                    />
                    <div className="flex justify-between text-sm pt-1">
                      <span className="font-medium">{formatCurrency(goal.current)}</span>
                      <span className="text-muted-foreground">of {formatCurrency(goal.target)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Remaining</span>
                      <span>{formatCurrency(goal.target - goal.current)}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Monthly Needed</span>
                      <span>{formatCurrency(Math.round((goal.target - goal.current) / 6))}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="bg-muted/50 px-6 py-3">
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Edit Goal
                    </Button>
                    <Button size="sm" className="h-8">
                      Add Contribution
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Goals Summary</CardTitle>
              <CardDescription>Overview of all your financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Goal Amount</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(financialGoals.reduce((sum, goal) => sum + goal.target, 0))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current Progress</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(financialGoals.reduce((sum, goal) => sum + goal.current, 0))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Remaining</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(
                        financialGoals.reduce((sum, goal) => sum + (goal.target - goal.current), 0)
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Overall Progress</p>
                  <Progress 
                    value={
                      (financialGoals.reduce((sum, goal) => sum + goal.current, 0) / 
                      financialGoals.reduce((sum, goal) => sum + goal.target, 0)) * 100
                    } 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Goal Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="text-center py-8 px-4">
          <div className="max-w-md mx-auto">
            <div className="rounded-full w-12 h-12 bg-muted flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No Completed Goals Yet</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              Keep working toward your financial goals. Completed goals will appear here.
            </p>
            <Button variant="outline">
              View Active Goals
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-finance-primary" />
                  Emergency Fund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Save 3-6 months of living expenses in an easily accessible account.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Recommended Amount</p>
                  <p className="text-sm font-medium">$10,000 - $30,000</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">Typical Timeframe</p>
                  <p className="text-sm font-medium">12 - 24 months</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-finance-accent" />
                  Down Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Save for a down payment on a home, typically 20% of purchase price.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Recommended Amount</p>
                  <p className="text-sm font-medium">$40,000 - $100,000</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">Typical Timeframe</p>
                  <p className="text-sm font-medium">3 - 5 years</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-finance-info" />
                  Vacation Fund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Set aside money for your dream vacation without going into debt.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Recommended Amount</p>
                  <p className="text-sm font-medium">$2,000 - $10,000</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">Typical Timeframe</p>
                  <p className="text-sm font-medium">6 - 12 months</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-finance-danger" />
                  Debt Payoff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create a plan to pay off credit cards, loans, or other debts.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Strategies</p>
                  <ul className="text-sm list-disc list-inside mt-1 space-y-1">
                    <li>Debt Snowball (smallest balance first)</li>
                    <li>Debt Avalanche (highest interest first)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-finance-secondary" />
                  New Car Fund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Save for your next vehicle purchase to avoid or minimize financing.
                </p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">Recommended Amount</p>
                  <p className="text-sm font-medium">$5,000 - $30,000</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">Typical Timeframe</p>
                  <p className="text-sm font-medium">1 - 3 years</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Custom Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create a fully customized financial goal for any purpose.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Custom Goal</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Goals;
