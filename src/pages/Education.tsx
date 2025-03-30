
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function Education() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Financial Education</h1>
        <p className="text-muted-foreground text-lg">Expand your financial knowledge with our educational resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="bg-blue-100 p-2.5 rounded-md w-fit mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <CardTitle>Investing Basics</CardTitle>
            <CardDescription>Learn the fundamentals of growing your wealth</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button variant="ghost" className="w-full justify-between mt-2">
              Explore topic <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="bg-purple-100 p-2.5 rounded-md w-fit mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <CardTitle>Retirement Planning</CardTitle>
            <CardDescription>Prepare for your financial future</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button variant="ghost" className="w-full justify-between mt-2">
              Explore topic <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="bg-pink-100 p-2.5 rounded-md w-fit mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <CardTitle>Credit & Debt Management</CardTitle>
            <CardDescription>Master credit and manage debt effectively</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button variant="ghost" className="w-full justify-between mt-2">
              Explore topic <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="bg-green-100 p-2.5 rounded-md w-fit mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" />
                <path d="M15 18h-5" />
                <path d="M10 6h8v4h-8V6Z" />
              </svg>
            </div>
            <CardTitle>Tax Strategies</CardTitle>
            <CardDescription>Optimize your tax planning</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button variant="ghost" className="w-full justify-between mt-2">
              Explore topic <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="bg-orange-100 p-2.5 rounded-md w-fit mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                <path d="M9 12H5.5a2.5 2.5 0 0 1 0-5H9" />
                <path d="M14 7V5.5a2.5 2.5 0 0 1 5 0V7" />
                <path d="M16 7h2.5a2.5 2.5 0 0 1 0 5H16" />
                <path d="M9 7h1" />
                <path d="M22 19v2h-2" />
                <path d="M22 12v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h4" />
              </svg>
            </div>
            <CardTitle>Insurance Basics</CardTitle>
            <CardDescription>Protect yourself and your assets</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button variant="ghost" className="w-full justify-between mt-2">
              Explore topic <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="bg-cyan-100 p-2.5 rounded-md w-fit mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <CardTitle>Home Buying Guide</CardTitle>
            <CardDescription>Navigate the process of buying a home</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button variant="ghost" className="w-full justify-between mt-2">
              Explore topic <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="investing" className="mt-12">
        <TabsList className="mb-4">
          <TabsTrigger value="investing">Investing Basics</TabsTrigger>
          <TabsTrigger value="retirement">Retirement Planning</TabsTrigger>
          <TabsTrigger value="credit">Credit & Debt</TabsTrigger>
          <TabsTrigger value="tax">Tax Strategies</TabsTrigger>
        </TabsList>

        <TabsContent value="investing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investing Basics</CardTitle>
              <div className="flex gap-4 mb-4 overflow-x-auto py-2">
                <Button variant="default" size="sm" className="rounded-full">Introduction</Button>
                <Button variant="outline" size="sm" className="rounded-full">Investment Types</Button>
                <Button variant="outline" size="sm" className="rounded-full">Risk & Return</Button>
                <Button variant="outline" size="sm" className="rounded-full">Getting Started</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">What is Investing?</h3>
                <p className="text-muted-foreground mb-4">
                  Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. Unlike saving, which involves putting money aside for future use with minimal risk, investing involves some level of risk in pursuit of potential returns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Why Invest?</h3>
                <p className="text-muted-foreground mb-4">
                  The primary reasons to invest include:
                </p>
                <ul className="list-disc list-inside mb-4 text-muted-foreground">
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Growing wealth:</span> Investments typically offer higher returns than savings accounts, allowing your money to grow faster over time.
                  </li>
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Beating inflation:</span> The cost of goods and services tends to rise over time. Investments help your money maintain and increase its purchasing power.
                  </li>
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Achieving financial goals:</span> Whether it's retirement, buying a home, or funding education, investing can help you reach these significant financial milestones.
                  </li>
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Creating passive income:</span> Many investments generate regular income without requiring constant work.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-md border">
                <h4 className="flex items-center text-lg font-medium mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  Key Insight
                </h4>
                <p className="text-muted-foreground">
                  Time in the market beats timing the market. The longer your money is invested, the more opportunity it has to grow and weather market fluctuations.
                </p>
              </div>

              <Button variant="outline" className="mt-4">
                Continue to Investment Types
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retirement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Planning</CardTitle>
              <div className="flex gap-4 mb-4 overflow-x-auto py-2">
                <Button variant="default" size="sm" className="rounded-full">Basics</Button>
                <Button variant="outline" size="sm" className="rounded-full">Retirement Accounts</Button>
                <Button variant="outline" size="sm" className="rounded-full">Planning Strategies</Button>
                <Button variant="outline" size="sm" className="rounded-full">Calculators</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Why Plan for Retirement?</h3>
                <p className="text-muted-foreground mb-4">
                  Retirement planning is the process of determining retirement income goals and the actions needed to achieve those goals. The importance of retirement planning includes:
                </p>
                <ul className="list-disc list-inside mb-4 text-muted-foreground">
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Financial independence:</span> Maintaining your lifestyle without relying on employment income
                  </li>
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Healthcare coverage:</span> Preparing for increased medical expenses that typically come with aging
                  </li>
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Long-term security:</span> Ensuring you don't outlive your savings
                  </li>
                  <li className="mb-2">
                    <span className="font-medium text-foreground">Quality of life:</span> Having the means to enjoy your retirement years
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">The Three Pillars of Retirement Income</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">Social Security</h4>
                    <p className="text-muted-foreground mb-2">Government-provided benefits based on your work history and earnings.</p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4">
                      <li>Benefits can start as early as age 62, but are reduced compared to waiting until full retirement age (66-67 for most current workers)</li>
                      <li>Waiting until age 70 maximizes your monthly benefit</li>
                      <li>Typically replaces only about 40% of pre-retirement income for average earners</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Pension plans</h4>
                    <p className="text-muted-foreground mb-2">Employer-sponsored retirement plans that provide guaranteed income.</p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4">
                      <li>Becoming less common in the private sector, but still prevalent in government and some industries</li>
                      <li>Defined benefit plans guarantee a specific payout based on salary and years of service</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Personal savings</h4>
                    <p className="text-muted-foreground mb-2">Individual retirement accounts, employer-sponsored plans like 401(k)s, and other investments.</p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4">
                      <li>These have become the primary source of retirement income for most Americans</li>
                      <li>Include tax-advantaged accounts and personal investments</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-md border">
                <h4 className="flex items-center text-lg font-medium mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  Key Insight
                </h4>
                <p className="text-muted-foreground">
                  The earlier you start saving for retirement, the more time your money has to grow through compound interest. Even small contributions in your 20s and 30s can grow significantly by retirement age.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit & Debt Management</CardTitle>
              <div className="flex gap-4 mb-4 overflow-x-auto py-2">
                <Button variant="default" size="sm" className="rounded-full">Understanding Credit</Button>
                <Button variant="outline" size="sm" className="rounded-full">Debt Management</Button>
                <Button variant="outline" size="sm" className="rounded-full">Debt Payoff Strategies</Button>
                <Button variant="outline" size="sm" className="rounded-full">Consolidation Options</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Understanding Credit Scores</h3>
                <p className="text-muted-foreground mb-4">
                  A credit score is a number that represents your creditworthiness. It helps lenders determine the risk of lending money to you. In the United States, FICO® scores and VantageScore® are the most common, typically ranging from 300 to 850.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Components of a FICO® Score</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <div className="w-1/3 text-muted-foreground">Payment history (35%):</div>
                    <div className="w-2/3">Record of on-time payments</div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1/3 text-muted-foreground">Credit utilization (30%):</div>
                    <div className="w-2/3">Amount of available credit you're using</div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1/3 text-muted-foreground">Length of credit history (15%):</div>
                    <div className="w-2/3">Age of your accounts</div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1/3 text-muted-foreground">Credit mix (10%):</div>
                    <div className="w-2/3">Types of credit accounts you have</div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1/3 text-muted-foreground">New credit (10%):</div>
                    <div className="w-2/3">Recent applications for credit</div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Credit Score Ranges and What They Mean</h3>
                <div className="space-y-2">
                  <div className="flex items-center bg-red-50 p-2 rounded">
                    <div className="w-1/3 font-medium">Poor: 300-579</div>
                    <div className="w-2/3 text-sm">Difficult to get approved for credit; may require deposits or higher interest rates</div>
                  </div>
                  <div className="flex items-center bg-orange-50 p-2 rounded">
                    <div className="w-1/3 font-medium">Fair: 580-669</div>
                    <div className="w-2/3 text-sm">Below average; may qualify for some loans but with higher rates</div>
                  </div>
                  <div className="flex items-center bg-yellow-50 p-2 rounded">
                    <div className="w-1/3 font-medium">Good: 670-739</div>
                    <div className="w-2/3 text-sm">Near or slightly above average; eligible for many financial products</div>
                  </div>
                  <div className="flex items-center bg-green-50 p-2 rounded">
                    <div className="w-1/3 font-medium">Very Good: 740-799</div>
                    <div className="w-2/3 text-sm">Above average; likely to receive favorable terms</div>
                  </div>
                  <div className="flex items-center bg-blue-50 p-2 rounded">
                    <div className="w-1/3 font-medium">Excellent: 800-850</div>
                    <div className="w-2/3 text-sm">Well above average; access to best rates and terms</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
                <h4 className="flex items-center text-lg font-medium text-orange-800 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-orange-600">
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
                  Pro Tip
                </h4>
                <p className="text-orange-700">
                  Set up automatic payments for at least the minimum amount due on all your bills to avoid late payments, which can significantly damage your credit score. Pay more than the minimum whenever possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Strategies</CardTitle>
              <div className="flex gap-4 mb-4 overflow-x-auto py-2">
                <Button variant="default" size="sm" className="rounded-full">Tax Basics</Button>
                <Button variant="outline" size="sm" className="rounded-full">Deductions & Credits</Button>
                <Button variant="outline" size="sm" className="rounded-full">Retirement Tax Planning</Button>
                <Button variant="outline" size="sm" className="rounded-full">Investment Tax Strategies</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Understanding the U.S. Tax System</h3>
                <h4 className="text-lg font-bold mb-2">Progressive Tax Brackets</h4>
                <p className="text-muted-foreground mb-4">
                  The U.S. federal income tax system is progressive, meaning that higher income levels are taxed at higher rates. However, it's important to understand that moving into a higher tax bracket doesn't mean all your income is taxed at that higher rate—only the portion that falls within that bracket.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-4 py-2 text-left">Tax Rate</th>
                        <th className="border px-4 py-2 text-left">Single Filers (2025)</th>
                        <th className="border px-4 py-2 text-left">Married Filing Jointly (2025)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">10%</td>
                        <td className="border px-4 py-2">$0 - $11,600</td>
                        <td className="border px-4 py-2">$0 - $23,200</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border px-4 py-2">12%</td>
                        <td className="border px-4 py-2">$11,601 - $47,150</td>
                        <td className="border px-4 py-2">$23,201 - $94,300</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">22%</td>
                        <td className="border px-4 py-2">$47,151 - $100,525</td>
                        <td className="border px-4 py-2">$94,301 - $201,050</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border px-4 py-2">24%</td>
                        <td className="border px-4 py-2">$100,526 - $191,950</td>
                        <td className="border px-4 py-2">$201,051 - $383,900</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">32%</td>
                        <td className="border px-4 py-2">$191,951 - $243,725</td>
                        <td className="border px-4 py-2">$383,901 - $487,450</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border px-4 py-2">35%</td>
                        <td className="border px-4 py-2">$243,726 - $609,350</td>
                        <td className="border px-4 py-2">$487,451 - $731,200</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">37%</td>
                        <td className="border px-4 py-2">Over $609,350</td>
                        <td className="border px-4 py-2">Over $731,200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Types of Taxes</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Federal income tax: Collected by the IRS based on your earnings</li>
                    <li>State income tax: Collected by most (but not all) states based on your earnings</li>
                    <li>FICA taxes: Social Security (6.2%) and Medicare (1.45%) taxes</li>
                    <li>Capital gains tax: Tax on profits from the sale of investments or property</li>
                    <li>Property tax: Local taxes based on the value of real estate you own</li>
                    <li>Sales tax: State and local taxes on purchases</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-2">Tax Filing Status</h3>
                  <p className="text-muted-foreground mb-2">Your filing status determines your tax rates and eligibility for certain deductions and credits. The five filing statuses are:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Single: Unmarried or legally separated</li>
                    <li>Married Filing Jointly (MFJ): Combined return for married couples</li>
                    <li>Married Filing Separately (MFS): Separate returns for married couples</li>
                    <li>Head of Household (HOH): Unmarried with qualifying dependents</li>
                    <li>Qualifying Widow(er): Surviving spouse with dependent child</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-md border border-green-100">
                <h4 className="flex items-center text-lg font-medium text-green-800 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                    <line x1="10" y1="22" x2="14" y2="22"></line>
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  </svg>
                  Pro Tip
                </h4>
                <p className="text-green-700">
                  The difference between your marginal tax rate (the highest bracket you fall into) and your effective tax rate (the average percentage of your income paid in taxes) can be significant. Understanding this difference helps you make better financial decisions, especially regarding tax-advantaged investments.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
