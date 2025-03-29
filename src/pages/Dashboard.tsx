
import { AreaChart, BarChart, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  financialOverview, 
  budgetCategories, 
  monthlyExpenses, 
  monthlyIncome 
} from "@/data/mockData";
import { StatCard } from "@/components/ui/stat-card";
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area
} from "recharts";
import { format } from "date-fns";

const COLORS = ['#1e40af', '#0369a1', '#059669', '#16a34a', '#f59e0b', '#dc2626', '#0284c7', '#6366f1'];

const Dashboard = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const currentDate = format(new Date(), "MMMM d, yyyy");
  
  // Calculate total budget allocation and spending
  const totalBudgeted = budgetCategories.reduce((sum, category) => sum + category.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, category) => sum + category.spent, 0);
  
  // Format income and expenses data for the area chart
  const incomeExpenseData = monthlyIncome.map((item, index) => ({
    month: item.month,
    income: item.amount,
    expenses: monthlyExpenses[index].amount,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">As of {currentDate}</p>
      </div>
      
      {/* Financial Overview Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Net Worth"
          value={formatCurrency(financialOverview.netWorth)}
          description="Assets minus Liabilities"
          trend="positive"
          trendValue="+5.2% from last month"
          icon={<BarChart className="h-4 w-4" />}
        />
        <StatCard
          title="Monthly Income"
          value={formatCurrency(financialOverview.monthlyIncome)}
          description="After taxes"
          trend="neutral"
          trendValue="No change"
          icon={<AreaChart className="h-4 w-4" />}
        />
        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(financialOverview.monthlyExpenses)}
          description="All categories"
          trend="negative"
          trendValue="+2.8% from last month"
          icon={<AreaChart className="h-4 w-4" />}
        />
        <StatCard
          title="Savings Rate"
          value={`${financialOverview.savingsRate}%`}
          description="Of monthly income"
          trend="positive"
          trendValue="+1.5% from last month"
          icon={<PieChart className="h-4 w-4" />}
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Income vs Expenses Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart
                  data={incomeExpenseData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(value)
                    }
                  />
                  <Tooltip 
                    formatter={(value) => 
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(value as number)
                    }
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stackId="1" 
                    stroke="#1e40af" 
                    fill="#1e40af" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2" 
                    stroke="#dc2626" 
                    fill="#dc2626" 
                    fillOpacity={0.6}
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Budget Allocation */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={budgetCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgetCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Budget Status Section */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={budgetCategories}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <Tooltip
                  formatter={(value) => 
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value as number)
                  }
                />
                <Legend />
                <Bar dataKey="allocated" name="Budgeted" fill="#1e40af" />
                <Bar dataKey="spent" name="Spent" fill="#0369a1" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total Budgeted</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudgeted)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Spent</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Remaining</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudgeted - totalSpent)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
