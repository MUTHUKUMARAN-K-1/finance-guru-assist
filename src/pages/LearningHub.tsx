
import { useState } from "react";
import { Search, BookOpen, GraduationCap, FileText, ArrowRight, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { educationalResources } from "@/data/mockData";

const LearningHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter tutorials based on search query
  const filteredTutorials = searchQuery
    ? educationalResources.tutorials.filter(
        tutorial => tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : educationalResources.tutorials;
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Integrated Educational Hub</h1>
        <p className="text-muted-foreground text-lg">
          Expand your financial knowledge with interactive learning tools, step-by-step tutorials, real-world case 
          studies, and personalized financial simulations.
        </p>
      </div>
      
      {/* Navigation Tabs */}
      <Tabs defaultValue="resources" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TabsTrigger value="resources" className="flex items-center justify-center gap-2 py-6 h-auto">
            <BookOpen className="h-5 w-5" />
            <span>Learning Resources</span>
          </TabsTrigger>
          <TabsTrigger value="case-studies" className="flex items-center justify-center gap-2 py-6 h-auto">
            <FileText className="h-5 w-5" />
            <span>Case Studies</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center justify-center gap-2 py-6 h-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart">
              <line x1="12" x2="12" y1="20" y2="10" />
              <line x1="18" x2="18" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="16" />
            </svg>
            <span>Interactive Tools</span>
          </TabsTrigger>
          <TabsTrigger value="additional" className="flex items-center justify-center gap-2 py-6 h-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-square">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            <span>Additional Resources</span>
          </TabsTrigger>
        </div>
        
        <TabsContent value="resources">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-slate-200 rounded-full p-4">
                <BookOpen className="h-8 w-8 text-slate-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Step-by-Step Financial Education</h2>
                <p className="text-muted-foreground">
                  Master essential financial concepts through our comprehensive tutorials, built to take you from beginner to expert at your own pace.
                </p>
              </div>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tutorials by title, category, or keyword..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="rounded-full">All</Button>
              <Button variant="outline" size="sm" className="rounded-full">Budgeting</Button>
              <Button variant="outline" size="sm" className="rounded-full">Investing</Button>
              <Button variant="outline" size="sm" className="rounded-full">Debt</Button>
              <Button variant="outline" size="sm" className="rounded-full">Retirement</Button>
              <Button variant="outline" size="sm" className="rounded-full">Beginner</Button>
            </div>
            
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
              <span>Featured Tutorials</span>
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTutorials.slice(0, 3).map((tutorial, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        {tutorial.category === "budgeting" ? (
                          <div className="p-2 bg-blue-100 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                              <path d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                              <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
                              <path d="M9 13h6" />
                              <path d="M12 16V7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="p-2 bg-green-100 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                          </div>
                        )}
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="font-normal">
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <GraduationCap className="mr-1 h-4 w-4" />
                      <span>Estimated time: {tutorial.duration}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-muted/40 border-t">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-500">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-sm">Top rated</span>
                    </div>
                    <div className="text-sm">
                      {index === 0 ? "Not started" : index === 1 ? "35% complete" : "50% complete"}
                    </div>
                  </CardFooter>
                  <div className="h-1 w-full">
                    {index === 0 ? null : (
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: index === 1 ? '35%' : '50%' }}
                      ></div>
                    )}
                  </div>
                  <Button className="rounded-none h-12">
                    {index === 0 ? "Start Tutorial" : "Continue"}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="case-studies">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-slate-200 rounded-full p-4">
                <FileText className="h-8 w-8 text-slate-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Real-World Case Studies</h2>
                <p className="text-muted-foreground">
                  Apply financial concepts to practical situations through interactive case studies and learn from real-world scenarios.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationalResources.caseStudies.map((caseStudy, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={
                        caseStudy.category === "investing" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                        caseStudy.category === "budgeting" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                        "bg-orange-100 text-orange-800 hover:bg-orange-100"
                      }>
                        {caseStudy.category}
                      </Badge>
                    </div>
                    <CardTitle>{caseStudy.title}</CardTitle>
                    <CardDescription>{caseStudy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">What You'll Learn:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Key financial principles</li>
                        <li>Practical application</li>
                        <li>Decision-making frameworks</li>
                        <li>Long-term implications</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Explore Case Study</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tools">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-slate-200 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
                  <line x1="12" x2="12" y1="20" y2="10" />
                  <line x1="18" x2="18" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="16" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Interactive Financial Tools</h2>
                <p className="text-muted-foreground">
                  Use powerful calculators and simulators to model financial scenarios and make informed decisions for your future.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="bg-blue-100 p-2.5 rounded-md w-fit mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <line x1="12" x2="12" y1="14" y2="14" />
                      <line x1="12" x2="12" y1="18" y2="18" />
                      <line x1="8" x2="16" y1="10" y2="10" />
                      <line x1="8" x2="16" y1="6" y2="6" />
                    </svg>
                  </div>
                  <CardTitle>Investment Calculator</CardTitle>
                  <CardDescription>
                    Project your investment growth with compound interest calculations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Input your initial investment, monthly contributions, and expected return rate 
                    to see how your investments could grow over time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use Calculator</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="bg-green-100 p-2.5 rounded-md w-fit mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M3 9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
                      <path d="M9 13h6" />
                      <path d="M12 16V7" />
                    </svg>
                  </div>
                  <CardTitle>Budget Analyzer</CardTitle>
                  <CardDescription>
                    Break down your income and expenses to create an optimal budget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Input your income and expenses to get personalized budget recommendations 
                    and savings opportunities based on the 50/30/20 rule.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use Calculator</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="bg-orange-100 p-2.5 rounded-md w-fit mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <CardTitle>Debt Payoff Planner</CardTitle>
                  <CardDescription>
                    Create a strategy to eliminate your debt as efficiently as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Compare debt avalanche vs. debt snowball methods to find the best debt 
                    repayment strategy for your specific situation.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use Calculator</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="additional">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-slate-200 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Additional Resources</h2>
                <p className="text-muted-foreground">
                  Explore our collection of supplementary materials, financial guides, and recommended readings to further enhance your financial knowledge.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Glossary</CardTitle>
                  <CardDescription>
                    Comprehensive definitions of financial terms and concepts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our glossary contains definitions for over 200 financial terms to help you understand complex financial concepts and jargon.
                  </p>
                  <div className="flex items-center mt-4 text-sm">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">200+ financial terms defined</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Browse Glossary</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Downloadable Resources</CardTitle>
                  <CardDescription>
                    Worksheets, checklists, and guides you can download and use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access printable worksheets, budget templates, financial checklists, and comprehensive guides to help organize your finances.
                  </p>
                  <div className="flex items-center mt-4 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    <span className="text-muted-foreground">25+ downloadable resources</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Access Downloads</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Books</CardTitle>
                  <CardDescription>
                    Curated reading list for financial self-education
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore our curated collection of the best books on personal finance, investing, retirement planning, and financial independence.
                  </p>
                  <div className="flex items-center mt-4 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <span className="text-muted-foreground">50+ book recommendations</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Reading List</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Financial Podcasts</CardTitle>
                  <CardDescription>
                    Recommended podcasts for financial education on the go
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Listen and learn with our recommended financial podcasts covering topics from budgeting to advanced investing strategies.
                  </p>
                  <div className="flex items-center mt-4 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground">
                      <circle cx="12" cy="11" r="1" />
                      <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5Z" />
                      <path d="M8 14a5 5 0 1 1 8 0" />
                      <path d="M17 18.5a9 9 0 1 0-10 0" />
                    </svg>
                    <span className="text-muted-foreground">20+ podcast recommendations</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Browse Podcasts</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Featured Topic Section */}
      <div className="bg-white p-8 rounded-lg border">
        <h2 className="text-2xl font-bold mb-8">Featured Topic: Investing Basics</h2>
        
        <div className="mb-8">
          <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
            <Button variant="default" size="sm" className="rounded-full">Introduction</Button>
            <Button variant="outline" size="sm" className="rounded-full">Investment Types</Button>
            <Button variant="outline" size="sm" className="rounded-full">Risk & Return</Button>
            <Button variant="outline" size="sm" className="rounded-full">Getting Started</Button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">What is Investing?</h3>
            <p className="text-muted-foreground mb-4">
              Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. Unlike saving, which involves putting money aside for future use with minimal risk, investing involves some level of risk in pursuit of potential returns.
            </p>
            
            <h3 className="text-xl font-bold mb-4 mt-8">Why Invest?</h3>
            <p className="text-muted-foreground mb-4">
              The primary reasons people invest include:
            </p>
            <ul className="list-disc list-inside mb-4 text-muted-foreground">
              <li className="mb-2">
                <span className="font-medium text-foreground">Building wealth:</span> Investments can grow your money faster than savings accounts due to compounding returns.
              </li>
              <li className="mb-2">
                <span className="font-medium text-foreground">Beating inflation:</span> Investment returns typically outpace inflation, helping preserve your purchasing power.
              </li>
              <li className="mb-2">
                <span className="font-medium text-foreground">Achieving financial goals:</span> Investments can help fund major expenses like education, retirement, or buying a home.
              </li>
              <li className="mb-2">
                <span className="font-medium text-foreground">Creating income streams:</span> Some investments generate regular income through dividends or interest payments.
              </li>
            </ul>
            
            <Button variant="outline" className="mt-4">
              Continue to Investment Types
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
