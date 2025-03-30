
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeftRight,
  BuildingBank,
  BarChart3,
  BookOpen,
  ChevronRight,
  CreditCard,
  FolderKanban,
  GraduationCap,
  HelpCircle,
  Home,
  LineChart,
  Menu,
  MessagesSquare,
  PiggyBank,
  Target,
  User,
} from "lucide-react";

const Sidebar = () => {
  const { open, setOpen, isMobile, openMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const toggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? null : group);
  };

  const toggle = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  const isActiveRoute = (route: string) => {
    if (route === "/" && location.pathname === "/") return true;
    if (route !== "/" && location.pathname.startsWith(route)) return true;
    return false;
  };

  const navigationItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Budgeting",
      icon: <CreditCard className="h-5 w-5" />,
      isGroup: true,
      items: [
        {
          title: "Budget Overview",
          href: "/budget",
        },
        {
          title: "Budget Calculator",
          href: "/budget-calculator",
        },
      ],
    },
    {
      title: "Investments",
      icon: <PiggyBank className="h-5 w-5" />,
      isGroup: true,
      items: [
        {
          title: "Investment Overview",
          href: "/investments",
        },
        {
          title: "Investment Calculator",
          href: "/investment-calculator",
        },
        {
          title: "Stocks",
          href: "/stocks",
        },
      ],
    },
    {
      title: "Goals",
      icon: <Target className="h-5 w-5" />,
      href: "/goals",
    },
    {
      title: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
      isGroup: true,
      items: [
        {
          title: "Educational Resources",
          href: "/education",
        },
        {
          title: "Learning Hub",
          href: "/learning-hub",
        },
        {
          title: "Resource Library",
          href: "/resources",
        },
      ],
    },
    {
      title: "AI Advisor",
      icon: <MessagesSquare className="h-5 w-5" />,
      href: "/advisor",
    },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {openMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-sidebar border-r border-sidebar-border shadow-sm transition-transform lg:translate-x-0 lg:relative lg:top-auto lg:z-auto ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold text-sidebar-foreground"
          >
            <BuildingBank className="h-5 w-5" />
            <span>FinanceGuru</span>
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar content */}
        <ScrollArea className="flex-1 py-3">
          <div className="space-y-1 px-2">
            {navigationItems.map((item, index) => (
              <div key={index}>
                {item.isGroup ? (
                  <>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between ${
                        item.items?.some((subItem) =>
                          isActiveRoute(subItem.href)
                        )
                          ? "text-sidebar-primary bg-sidebar-accent/10"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-primary"
                      }`}
                      onClick={() => toggleGroup(item.title)}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          activeGroup === item.title ? "rotate-90" : ""
                        }`}
                      />
                    </Button>
                    {activeGroup === item.title && (
                      <div className="pl-9 space-y-1 mt-1">
                        {item.items?.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.href}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-md text-sm ${
                                isActive
                                  ? "bg-sidebar-accent/20 text-sidebar-primary font-medium"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-primary"
                              }`
                            }
                          >
                            {subItem.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-sidebar-accent/20 text-sidebar-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-primary"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer with help and settings */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 h-10 w-10 rounded-full shadow-lg z-50 lg:hidden bg-background"
        onClick={toggle}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
};

export default Sidebar;
