
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  FolderArchive, 
  LayoutDashboard, 
  LineChart, 
  MessageSquare, 
  Target
} from "lucide-react";
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  
  // Menu items data
  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Budget", path: "/budget", icon: BarChart },
    { name: "Investments", path: "/investments", icon: LineChart },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "Stocks", path: "/stocks", icon: Briefcase },
    { name: "Education", path: "/education", icon: BookOpen },
    { name: "Resources", path: "/resources", icon: FolderArchive },
    { name: "AI Advisor", path: "/advisor", icon: MessageSquare },
  ];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="border-b p-4 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">FG</span>
          </div>
          <span className="font-bold text-lg">FinanceGuru</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="py-2">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md transition-colors",
                      location.pathname === item.path 
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="space-y-4">
          <div className="bg-primary/10 rounded-lg p-4">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Financial Tip
            </h4>
            <p className="text-xs mt-2 text-muted-foreground">
              Set up an emergency fund with 3-6 months of expenses for financial security.
            </p>
            <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs">
              <span>Learn more</span>
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
