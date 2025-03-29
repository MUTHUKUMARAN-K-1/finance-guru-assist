
import { useState } from "react";
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Search, 
  ChevronRight, 
  Lightbulb, 
  Calculator,
  ArrowRight,
  BadgeInfo,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { educationalResources } from "@/data/mockData";
import { StatCard } from "@/components/ui/stat-card";

const Education = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter glossary terms based on search query
  const filteredTerms = searchQuery
    ? educationalResources.glossaryTerms.filter(
        term => term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
               term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : educationalResources.glossaryTerms;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Financial Education</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for topics..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Financial Quick Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <StatCard
          title="Financial Knowledge"
          value="Expand Your Understanding"
          description="Learn the fundamentals of personal finance"
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <StatCard
          title="Financial Glossary"
          value="20+ Financial Terms"
          description="Clear explanations of important concepts"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          title="Interactive Case Studies"
          value="Real-World Scenarios"
          description="Apply financial concepts to practical situations"
          icon={<FileText className="h-4 w-4" />}
        />
      </div>
      
      {/* Education Tabs */}
      <Tabs defaultValue="tutorials" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="glossary">Financial Glossary</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="calculators">Financial Calculators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {educationalResources.tutorials.map((tutorial, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge variant="outline" className="font-normal">
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <GraduationCap className="mr-1 h-4 w-4" />
                    <span>Estimated time: {tutorial.duration}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full justify-between">
                    Start Tutorial
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning Paths</CardTitle>
              <CardDescription>
                Follow structured learning paths to build your financial knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-full">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Beginner's Path</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start your financial journey with the fundamentals of budgeting, saving, and basic investing concepts.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">5 tutorials</Badge>
                        <Badge variant="outline" className="font-normal">2 case studies</Badge>
                        <Badge variant="outline" className="font-normal">3 calculators</Badge>
                      </div>
                      <Button variant="link" className="px-0 mt-1 h-auto">
                        <span>View Path</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-full">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Intermediate Investor</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Deepen your knowledge with advanced budgeting techniques, investment strategies, and retirement planning.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">4 tutorials</Badge>
                        <Badge variant="outline" className="font-normal">3 case studies</Badge>
                        <Badge variant="outline" className="font-normal">2 calculators</Badge>
                      </div>
                      <Button variant="link" className="px-0 mt-1 h-auto">
                        <span>View Path</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-full">
                      <Calculator className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Advanced Financial Planning</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Master complex topics like tax optimization, estate planning, and advanced investment strategies.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">3 tutorials</Badge>
                        <Badge variant="outline" className="font-normal">4 case studies</Badge>
                        <Badge variant="outline" className="font-normal">2 calculators</Badge>
                      </div>
                      <Button variant="link" className="px-0 mt-1 h-auto">
                        <span>View Path</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="glossary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Glossary</CardTitle>
              <CardDescription>
                Learn common financial terms and concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for financial terms..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {filteredTerms.map((term, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <span>{term.term}</span>
                        <Badge variant="outline" className="ml-2 text-xs font-normal">
                          {term.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {term.definition}
                      </p>
                      <Button variant="link" className="px-0 h-auto text-xs">
                        Learn more about {term.term}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {filteredTerms.length === 0 && (
                <div className="text-center py-8">
                  <BadgeInfo className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No terms found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="case-studies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {educationalResources.caseStudies.map((caseStudy, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center mt-2 mb-4">
                    <Badge variant="outline">{caseStudy.category}</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">What You'll Learn:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Key financial principles</li>
                      <li>Practical application</li>
                      <li>Decision-making frameworks</li>
                      <li>Long-term implications</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full">Explore Case Study</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Interactive Learning Experience</CardTitle>
              <CardDescription>
                Learn through real-world financial scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our case studies provide interactive learning experiences where you can:
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-medium">Analyze Scenarios</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Examine real-world financial situations and learn to identify key factors.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calculator className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-medium">Run Calculations</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use interactive calculators to see how different variables affect outcomes.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-medium">Make Decisions</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Practice making financial decisions and see the long-term impact.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Case Studies
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="calculators" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Compound Interest
                </CardTitle>
                <CardDescription>
                  Calculate how your investments grow over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  See how compound interest can dramatically increase your wealth over time.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Inputs:</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Initial investment</li>
                    <li>Monthly contribution</li>
                    <li>Interest rate</li>
                    <li>Investment period</li>
                    <li>Compounding frequency</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Open Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Debt Repayment
                </CardTitle>
                <CardDescription>
                  Plan your journey to becoming debt-free
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare different debt repayment strategies and find the best approach for your situation.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Inputs:</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Debt balances</li>
                    <li>Interest rates</li>
                    <li>Minimum payments</li>
                    <li>Available monthly payment</li>
                    <li>Strategy (snowball/avalanche)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Open Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Retirement Planner
                </CardTitle>
                <CardDescription>
                  Plan for your financial future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate how much you need to save for retirement and create a savings plan.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Inputs:</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Current age</li>
                    <li>Retirement age</li>
                    <li>Current savings</li>
                    <li>Monthly contributions</li>
                    <li>Expected return rate</li>
                    <li>Retirement income needs</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Open Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Budget Optimizer
                </CardTitle>
                <CardDescription>
                  Optimize your budget allocations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get personalized budget category recommendations based on your income and goals.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Inputs:</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Monthly income</li>
                    <li>Fixed expenses</li>
                    <li>Financial goals</li>
                    <li>Current spending habits</li>
                    <li>Budget strategy preference</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Open Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Mortgage Calculator
                </CardTitle>
                <CardDescription>
                  Plan your home purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate mortgage payments, amortization schedules, and affordability.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Inputs:</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Home price</li>
                    <li>Down payment</li>
                    <li>Loan term</li>
                    <li>Interest rate</li>
                    <li>Property taxes</li>
                    <li>Insurance</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Open Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Tax Estimator
                </CardTitle>
                <CardDescription>
                  Estimate your tax liability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a basic estimate of your tax liability and identify potential deductions.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Inputs:</h4>
                  <ul className="text-xs space-y-1 list-disc list-inside">
                    <li>Income sources</li>
                    <li>Filing status</li>
                    <li>Dependents</li>
                    <li>Potential deductions</li>
                    <li>Tax credits</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Open Calculator</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
