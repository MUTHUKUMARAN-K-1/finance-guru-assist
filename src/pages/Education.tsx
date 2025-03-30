
import { ArrowRight, BookOpen, GraduationCap, FileText, PiggyBank, Landmark, CreditCard, Calculator, ShieldCheck, Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Education = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Financial Education</h1>
        <p className="text-muted-foreground text-lg">Expand your financial knowledge with our educational resources</p>
      </div>
      
      <Tabs defaultValue="topics">
        <TabsList className="w-full md:w-auto mb-4">
          <TabsTrigger value="topics">Topic Library</TabsTrigger>
          <TabsTrigger value="featured">Featured Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <PiggyBank className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline">Popular</Badge>
                </div>
                <CardTitle className="mt-3">Investing Basics</CardTitle>
                <CardDescription>Learn the fundamentals of investing and growing your wealth</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Introduction to Investing
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Types of Investments
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Risk & Return
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Building a Portfolio
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between items-center pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>8 lessons</span>
                </div>
                <Button size="sm" variant="ghost" className="gap-1">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="bg-amber-100 p-2 rounded-md">
                    <Landmark className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <CardTitle className="mt-3">Retirement Planning</CardTitle>
                <CardDescription>Plan for a secure and comfortable retirement</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Retirement Account Types
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Social Security Benefits
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Retirement Income Strategies
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Healthcare in Retirement
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between items-center pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>6 lessons</span>
                </div>
                <Button size="sm" variant="ghost" className="gap-1">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="bg-red-100 p-2 rounded-md">
                    <CreditCard className="h-5 w-5 text-red-600" />
                  </div>
                  <Badge variant="outline">Essential</Badge>
                </div>
                <CardTitle className="mt-3">Credit & Debt Management</CardTitle>
                <CardDescription>Understand and optimize your credit and manage debt effectively</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Understanding Credit Scores
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Credit Building Strategies
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Debt Repayment Methods
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Debt Consolidation Options
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between items-center pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>7 lessons</span>
                </div>
                <Button size="sm" variant="ghost" className="gap-1">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="bg-green-100 p-2 rounded-md">
                    <Calculator className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <CardTitle className="mt-3">Tax Strategies</CardTitle>
                <CardDescription>Optimize your tax situation with smart planning</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Tax-Advantaged Accounts
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Deductions and Credits
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Tax-Efficient Investing
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Estate Planning Basics
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between items-center pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>5 lessons</span>
                </div>
                <Button size="sm" variant="ghost" className="gap-1">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <ShieldCheck className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="mt-3">Insurance Basics</CardTitle>
                <CardDescription>Protect yourself and your assets with proper insurance coverage</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Life Insurance Types
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Health Insurance Options
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Property & Casualty Insurance
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Disability & Long-Term Care
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between items-center pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>6 lessons</span>
                </div>
                <Button size="sm" variant="ghost" className="gap-1">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <Home className="h-5 w-5 text-orange-600" />
                  </div>
                  <Badge variant="outline">Popular</Badge>
                </div>
                <CardTitle className="mt-3">Home Buying Guide</CardTitle>
                <CardDescription>Navigate the process of purchasing your home with confidence</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Preparing to Buy
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Mortgage Basics
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    The Home Buying Process
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
                    Hidden Costs of Homeownership
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between items-center pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>8 lessons</span>
                </div>
                <Button size="sm" variant="ghost" className="gap-1">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="featured">
          <Card>
            <CardHeader>
              <CardTitle>Featured Topic: Investing Basics</CardTitle>
              <CardDescription>Learn the essential concepts of investing and growing your wealth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <ul className="space-y-3">
                    <li className="flex items-center p-2 bg-blue-50 rounded-md text-blue-800 font-medium">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      Introduction
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></span>
                      Investment Types
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></span>
                      Risk & Return
                    </li>
                    <li className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></span>
                      Getting Started
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-3/4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4">What is Investing?</h3>
                        <p className="text-muted-foreground mb-4">
                          Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. Unlike saving, which involves putting money aside for future use with minimal risk, investing involves some level of risk in pursuit of potential returns.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-4">Why Invest?</h3>
                        <p className="text-muted-foreground mb-4">
                          The primary reasons people invest include:
                        </p>
                        <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-2">
                          <li>
                            <span className="font-medium text-foreground">Building wealth:</span> Investments can grow your money faster than savings accounts due to compounding returns.
                          </li>
                          <li>
                            <span className="font-medium text-foreground">Beating inflation:</span> Investment returns typically outpace inflation, helping preserve your purchasing power.
                          </li>
                          <li>
                            <span className="font-medium text-foreground">Achieving financial goals:</span> Investments can help fund major expenses like education, retirement, or buying a home.
                          </li>
                          <li>
                            <span className="font-medium text-foreground">Creating income streams:</span> Some investments generate regular income through dividends or interest payments.
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="text-lg font-medium text-blue-800 mb-2 flex items-center">
                          <PiggyBank className="h-5 w-5 mr-2 text-blue-600" />
                          Key Insight
                        </h4>
                        <p className="text-blue-700">
                          Time in the market beats timing the market. The longer your money is invested, the more opportunity it has to grow and weather market fluctuations.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-4">The Power of Compound Interest</h3>
                        <p className="text-muted-foreground mb-4">
                          Albert Einstein reportedly called compound interest "the eighth wonder of the world." Compound interest occurs when you earn interest not just on your initial investment, but also on the interest already accumulated. This creates a snowball effect that can significantly increase your wealth over time.
                        </p>
                        <p className="text-muted-foreground mb-4">
                          For example, $10,000 invested at a 7% annual return would grow to approximately $76,123 after 30 years, even without adding any additional money. This demonstrates why starting to invest early is so beneficial.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-4">Starting Your Investment Journey</h3>
                        <p className="text-muted-foreground mb-4">
                          Before diving into investing, it's important to:
                        </p>
                        <ol className="list-decimal list-inside mb-4 text-muted-foreground space-y-2">
                          <li>Set clear financial goals (what are you investing for?)</li>
                          <li>Establish an emergency fund (typically 3-6 months of expenses)</li>
                          <li>Pay off high-interest debt (especially credit cards)</li>
                          <li>Understand your risk tolerance (how much volatility can you handle?)</li>
                          <li>Research different investment options (stocks, bonds, funds, etc.)</li>
                        </ol>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-muted/30 border-t">
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Estimated reading time: 12 minutes</span>
              </div>
              <Button className="gap-1">
                Continue to Investment Types <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
