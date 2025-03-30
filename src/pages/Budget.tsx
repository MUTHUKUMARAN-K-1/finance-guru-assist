
import { useState } from "react";
import { LightbulbIcon, InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetCalculator from "./BudgetCalculator";
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="12" x2="12" y1="14" y2="14" />
              <line x1="12" x2="12" y1="18" y2="18" />
              <line x1="8" x2="16" y1="10" y2="10" />
              <line x1="8" x2="16" y1="6" y2="6" />
            </svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-blue-600">
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
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
