
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import BudgetCalculator from "./pages/BudgetCalculator";
import Investments from "./pages/Investments";
import InvestmentCalculator from "./pages/InvestmentCalculator";
import Goals from "./pages/Goals";
import Stocks from "./pages/Stocks";
import Education from "./pages/Education";
import LearningHub from "./pages/LearningHub";
import Resources from "./pages/Resources";
import AdvisorChat from "./pages/AdvisorChat";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/budget-calculator" element={<BudgetCalculator />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/investment-calculator" element={<InvestmentCalculator />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/education" element={<Education />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/advisor" element={<AdvisorChat />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
