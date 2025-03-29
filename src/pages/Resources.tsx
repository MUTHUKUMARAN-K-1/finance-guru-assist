
import { useState } from "react";
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  FileText, 
  Filter, 
  Search, 
  Star,
  Youtube,
  FileSpreadsheet
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resourceLibrary } from "@/data/mockData";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter resources based on search query and active filter
  const filteredResources = resourceLibrary.filter(resource => {
    const matchesSearch = searchQuery
      ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesFilter = activeFilter
      ? resource.type === activeFilter
      : true;
    
    return matchesSearch && matchesFilter;
  });
  
  // Helper function to get badge and icon for resource type
  const getResourceTypeInfo = (type: string) => {
    switch (type) {
      case 'book':
        return { 
          icon: <BookOpen className="h-4 w-4" />, 
          label: "Book",
          color: "bg-blue-100 text-blue-800"
        };
      case 'course':
        return { 
          icon: <Youtube className="h-4 w-4" />, 
          label: "Course",
          color: "bg-red-100 text-red-800"
        };
      case 'template':
        return { 
          icon: <FileSpreadsheet className="h-4 w-4" />, 
          label: "Template",
          color: "bg-green-100 text-green-800"
        };
      case 'tool':
        return { 
          icon: <FileText className="h-4 w-4" />, 
          label: "Tool",
          color: "bg-purple-100 text-purple-800"
        };
      default:
        return { 
          icon: <FileText className="h-4 w-4" />, 
          label: "Resource",
          color: "bg-gray-100 text-gray-800"
        };
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">Resource Library</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Resource Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setActiveFilter(null)} className="gap-2">
                  <span>All Resources</span>
                  {activeFilter === null && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter('book')} className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Books</span>
                  {activeFilter === 'book' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter('course')} className="gap-2">
                  <Youtube className="h-4 w-4" />
                  <span>Courses</span>
                  {activeFilter === 'course' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter('template')} className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Templates</span>
                  {activeFilter === 'template' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter('tool')} className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Tools</span>
                  {activeFilter === 'tool' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Resource Categories */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeFilter === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter(null)}
        >
          All Resources
        </Button>
        <Button 
          variant={activeFilter === 'book' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('book')}
          className="gap-1"
        >
          <BookOpen className="h-4 w-4" />
          Books
        </Button>
        <Button 
          variant={activeFilter === 'course' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('course')}
          className="gap-1"
        >
          <Youtube className="h-4 w-4" />
          Courses
        </Button>
        <Button 
          variant={activeFilter === 'template' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('template')}
          className="gap-1"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Templates
        </Button>
        <Button 
          variant={activeFilter === 'tool' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('tool')}
          className="gap-1"
        >
          <FileText className="h-4 w-4" />
          Tools
        </Button>
      </div>
      
      {/* Resources Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, index) => {
            const { icon, label, color } = getResourceTypeInfo(resource.type);
            
            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div>
                      <Badge className={`font-normal ${color} mb-2 flex w-fit items-center gap-1`}>
                        {icon}
                        {label}
                      </Badge>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>By {resource.author}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(resource.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {resource.rating.toFixed(1)} rating
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {resource.type === 'template' || resource.type === 'tool' ? (
                    <Button variant="outline" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Visit Resource
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No resources found</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setActiveFilter(null);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Featured Collections */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Collections</CardTitle>
          <CardDescription>
            Curated resource collections for specific financial goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Getting Started with Investing</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Essential resources for beginner investors.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">Books</Badge>
                <Badge variant="outline">Courses</Badge>
                <Badge variant="outline">Tools</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">View Collection</Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Debt Freedom Plan</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Resources to help you eliminate debt and achieve financial freedom.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">Templates</Badge>
                <Badge variant="outline">Books</Badge>
                <Badge variant="outline">Tools</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">View Collection</Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Retirement Planning Essentials</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Everything you need to plan for a comfortable retirement.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">Books</Badge>
                <Badge variant="outline">Calculators</Badge>
                <Badge variant="outline">Templates</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">View Collection</Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Personal Finance for Families</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Financial education resources for parents and children.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">Books</Badge>
                <Badge variant="outline">Courses</Badge>
                <Badge variant="outline">Activities</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">View Collection</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Submission Invitation */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Have a Resource to Share?</CardTitle>
          <CardDescription>
            Help others by sharing valuable financial resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you know of a high-quality financial book, course, tool, or template that has helped you,
            consider submitting it to our resource library to help others on their financial journey.
          </p>
          <Button>Suggest a Resource</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;
