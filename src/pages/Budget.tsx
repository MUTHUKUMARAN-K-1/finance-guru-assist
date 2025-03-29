
import { useState } from "react";
import { Plus, DollarSign, PieChart, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { budgetCategories, monthlyExpenses } from "@/data/mockData";
import { 
  ResponsiveContainer, 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ['#1e40af', '#0369a1', '#059669', '#16a34a', '#f59e0b', '#dc2626', '#0284c7', '#6366f1', '#9333ea'];

const Budget = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Calculate budget summary
  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalAllocated - totalSpent;
  const percentUsed = Math.round((totalSpent / totalAllocated) * 100);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Budget Management</h1>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Budget
          </Button>
        </div>
      </div>
      
      {/* Budget Summary Card */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Monthly Budget</CardTitle>
              <CardDescription>June 2023</CardDescription>
            </div>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAllocated)}</div>
            <Progress value={percentUsed} className="h-2 mt-4" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>Spent: {percentUsed}%</span>
              <span>100%</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Allocated</p>
                <p className="text-lg font-medium">{formatCurrency(totalAllocated)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Spent</p>
                <p className="text-lg font-medium">{formatCurrency(totalSpent)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="text-lg font-medium text-finance-success">{formatCurrency(remaining)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={budgetCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="allocated"
                    nameKey="name"
                  >
                    {budgetCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Budget Tabs */}
      <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>View and manage your budget categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{formatCurrency(category.allocated)}</TableCell>
                      <TableCell>{formatCurrency(category.spent)}</TableCell>
                      <TableCell 
                        className={
                          category.allocated - category.spent >= 0 
                            ? "text-finance-success" 
                            : "text-finance-danger"
                        }
                      >
                        {formatCurrency(category.allocated - category.spent)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(category.spent / category.allocated) * 100} 
                            className="h-2"
                            indicatorClassName={
                              category.spent > category.allocated 
                                ? "bg-finance-danger"
                                : undefined
                            }
                          />
                          <span className="text-xs text-muted-foreground w-12">
                            {Math.round((category.spent / category.allocated) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Categories</CardTitle>
              <CardDescription>Add, edit, or remove budget categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input id="category-name" placeholder="Enter category name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-amount">Monthly Amount</Label>
                  <Input id="category-amount" placeholder="0.00" type="number" />
                </div>
              </div>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Current Categories</h3>
                <div className="space-y-2">
                  {budgetCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <span>{category.name}</span>
                      <span>{formatCurrency(category.allocated)}</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View and categorize your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Grocery Store</p>
                    <p className="text-sm text-muted-foreground">Jun 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-$122.45</p>
                    <p className="text-sm text-muted-foreground">Food</p>
                  </div>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Gas Station</p>
                    <p className="text-sm text-muted-foreground">Jun 13, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-$45.20</p>
                    <p className="text-sm text-muted-foreground">Transportation</p>
                  </div>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Coffee Shop</p>
                    <p className="text-sm text-muted-foreground">Jun 12, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-$4.55</p>
                    <p className="text-sm text-muted-foreground">Entertainment</p>
                  </div>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monthly Subscription</p>
                    <p className="text-sm text-muted-foreground">Jun 10, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-$12.99</p>
                    <p className="text-sm text-muted-foreground">Entertainment</p>
                  </div>
                </div>
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rent Payment</p>
                    <p className="text-sm text-muted-foreground">Jun 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-$1,450.00</p>
                    <p className="text-sm text-muted-foreground">Housing</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Load More Transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Settings</CardTitle>
              <CardDescription>Customize your budget preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income">Monthly After-Tax Income</Label>
                <Input id="income" placeholder="0.00" type="number" defaultValue="6800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-start">Budget Start Date</Label>
                <Input id="budget-start" type="date" defaultValue="2023-06-01" />
              </div>
              <div className="space-y-2">
                <Label>Budget Strategy</Label>
                <div className="grid gap-2">
                  <div className="flex items-center border p-3 rounded-md">
                    <input
                      type="radio"
                      id="fifty-thirty-twenty"
                      name="budget-strategy"
                      className="mr-2"
                      defaultChecked
                    />
                    <div>
                      <Label htmlFor="fifty-thirty-twenty" className="font-medium">50/30/20 Rule</Label>
                      <p className="text-sm text-muted-foreground">
                        50% for needs, 30% for wants, 20% for savings and debt repayment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center border p-3 rounded-md">
                    <input
                      type="radio"
                      id="zero-based"
                      name="budget-strategy"
                      className="mr-2"
                    />
                    <div>
                      <Label htmlFor="zero-based" className="font-medium">Zero-Based Budget</Label>
                      <p className="text-sm text-muted-foreground">
                        Every dollar of income is assigned to a specific category
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center border p-3 rounded-md">
                    <input
                      type="radio"
                      id="custom"
                      name="budget-strategy"
                      className="mr-2"
                    />
                    <div>
                      <Label htmlFor="custom" className="font-medium">Custom Allocation</Label>
                      <p className="text-sm text-muted-foreground">
                        Set your own custom allocation percentages
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Budget;
