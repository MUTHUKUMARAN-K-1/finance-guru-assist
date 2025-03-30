
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, LightbulbIcon } from "lucide-react";
import BudgetCalculator from "@/components/budget/budget-calculator";

export default function BudgetCalculatorPage() {
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Budget Planning</h1>
        <p className="text-sm text-muted-foreground">Create and manage your personal budget to achieve financial goals</p>
      </div>
      
      <Tabs defaultValue="calculator" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="calculator" className="flex gap-2 items-center">
            <Calculator className="h-4 w-4" />
            Budget Calculator
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex gap-2 items-center">
            <LightbulbIcon className="h-4 w-4" />
            Budgeting Tips
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-4">
          <BudgetCalculator />
        </TabsContent>
        
        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LightbulbIcon className="mr-2 h-5 w-5" />
                Effective Budgeting Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">The 50/30/20 Rule</h3>
                <p className="text-muted-foreground mb-2">
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
}
