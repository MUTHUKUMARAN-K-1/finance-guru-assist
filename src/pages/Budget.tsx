
import { useState } from "react";
import { LightbulbIcon, InfoIcon, Calculator, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetCalculator from "@/components/budget/budget-calculator";
import { CustomTooltip } from "@/components/ui/custom-tooltip";

export default function Budget() {
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Budget Management</h1>
        <p className="text-sm text-muted-foreground">Create and manage your personal budget to achieve financial goals</p>
      </div>

      <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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

        <TabsContent value="calculator">
          <BudgetCalculator />
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LightbulbIcon className="h-5 w-5 mr-2" />
                Effective Budgeting Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  The 50/30/20 Rule
                  <CustomTooltip content="A simple framework to allocate your after-tax income">
                    <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                  </CustomTooltip>
                </h3>
                <p className="text-muted-foreground mb-2">
                  A simple budgeting method that allocates your after-tax income to three categories:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li><span className="font-medium">50%</span> to needs (housing, food, utilities, transportation)</li>
                  <li><span className="font-medium">30%</span> to wants (entertainment, dining out, hobbies)</li>
                  <li><span className="font-medium">20%</span> to savings and debt repayment</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Zero-Based Budgeting</h3>
                <p className="text-muted-foreground mb-2">
                  Give every dollar a job so your income minus expenses equals zero. Steps include:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                  <li>List all sources of income</li>
                  <li>List all expenses (both fixed and variable)</li>
                  <li>Subtract expenses from income</li>
                  <li>Assign any remaining money to savings or debt payment</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Envelope System</h3>
                <p className="text-muted-foreground mb-2">
                  A cash-based method where you divide your money into different envelopes for different spending categories.
                </p>
                <p className="text-muted-foreground">
                  This can be done digitally with multiple bank accounts or budget apps that allow you to create virtual "envelopes."
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Pay Yourself First</h3>
                <p className="text-muted-foreground mb-2">
                  Automatically direct a portion of your income to savings before paying bills or discretionary spending.
                </p>
                <p className="text-muted-foreground">
                  Set up automatic transfers to savings accounts on payday to ensure consistency.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-2 flex items-center">
                  <PiggyBank className="h-5 w-5 mr-1 text-blue-600" />
                  Pro Tip
                </h3>
                <p className="text-blue-700">
                  Track your spending for at least 30 days before creating a budget to get an accurate picture of where your money is going. Use this data to set realistic spending limits in each category.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
