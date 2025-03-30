import { ArrowRight, Building, BookOpen, Calculator, CreditCard, Flag, GraduationCap, Home, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1e3a8a] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Your Personal Finance Mentor
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Get personalized advice on budgeting, investing, debt management, 
                and financial planning to achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/advisor")}
                  className="bg-white text-[#1e3a8a] hover:bg-gray-100"
                >
                  Talk to FinanceGuru
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/dashboard")}
                  className="border-white text-white hover:bg-white/10"
                >
                  Explore Features
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-[#2563eb] rounded-lg p-8 w-[80%] aspect-square flex items-center justify-center">
                <Building className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How FinanceGuru Helps You */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How FinanceGuru Helps You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized financial guidance with practical tools to manage your money effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center mb-3">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Personalized Budgeting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get tailored budget plans based on your income, expenses, and financial goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md bg-green-100 flex items-center justify-center mb-3">
                  <PiggyBank className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Investment Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn about investment options, risk tolerance, and strategies aligned with your financial goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md bg-orange-100 flex items-center justify-center mb-3">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Debt Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Develop strategies to reduce debt efficiently and improve your credit score.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center mb-3">
                  <Flag className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Goal Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create actionable plans for your financial goals, from buying a home to retirement planning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center mb-3">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Financial Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access easy-to-understand explanations of complex financial concepts and terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md bg-teal-100 flex items-center justify-center mb-3">
                  <Calculator className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Financial Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use interactive tools to plan for retirement, compare loan options, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Financial Education */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Financial Education</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expand your financial knowledge with our educational resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4">
                <PiggyBank className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-2">Investing Basics</h3>
              <p className="text-muted-foreground mb-4">
                Learn the fundamentals of investing, from stocks and bonds to funds and risk management.
              </p>
              <Button variant="link" className="group" onClick={() => navigate("/education")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4">
                <Building className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-2">Retirement Planning</h3>
              <p className="text-muted-foreground mb-4">
                Understand the different retirement accounts, withdrawal strategies, and how to calculate your needs.
              </p>
              <Button variant="link" className="group" onClick={() => navigate("/education")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4">
                <CreditCard className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-2">Credit & Debt Management</h3>
              <p className="text-muted-foreground mb-4">
                Master strategies for improving your credit score and managing debt effectively.
              </p>
              <Button variant="link" className="group" onClick={() => navigate("/education")}>
                Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => navigate("/education")} className="group">
              Browse all topics <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how FinanceGuru has helped others achieve their financial goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg font-medium">
                    "FinanceGuru helped me create a budget that actually works. I've managed to save $5,000 in just 6 months while paying down my credit card debt!"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Sarah J.</div>
                      <div className="text-sm text-muted-foreground">Marketing Specialist</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg font-medium">
                    "I had no idea where to start with investing. FinanceGuru broke it down for me and now I'm confidently building a diversified portfolio with just $200 a month."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Michael T.</div>
                      <div className="text-sm text-muted-foreground">Software Developer</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#1e3a8a] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Get personalized advice and actionable financial guidance today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#1e3a8a] hover:bg-gray-100"
              onClick={() => navigate("/advisor")}
            >
              Start Your Financial Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/dashboard")}
            >
              Explore Dashboard
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center text-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8.01L12.01 7.99889" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Your financial information is always secure and private
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Building className="h-6 w-6" />
                <span className="text-xl font-bold">FinanceGuru</span>
              </div>
              <p className="text-gray-300 mb-4">
                Your personal finance mentor, helping you achieve financial freedom through personalized guidance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Financial Education</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Budgeting Tools</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Investment Guides</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Retirement Planning</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Testimonials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Disclaimer</a></li>
              </ul>
              <div className="mt-4 p-3 bg-gray-800 rounded-md text-xs text-gray-300">
                FinanceGuru provides financial information for educational purposes only. For personalized advice, please consult with a certified financial professional.
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 FinanceGuru. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
