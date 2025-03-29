
import { useState } from "react";
import { OpenRouterModel } from "@/utils/openRouterUtils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelSelectorProps {
  models: OpenRouterModel[];
  selectedModel: OpenRouterModel;
  onSelectModel: (model: OpenRouterModel) => void;
  isLoading: boolean;
}

const ModelSelector = ({ 
  models, 
  selectedModel, 
  onSelectModel, 
  isLoading 
}: ModelSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const modelsPerPage = 5;

  // Group models by category
  const groupedModels = models.reduce((acc, model) => {
    const category = model.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {} as Record<string, OpenRouterModel[]>);

  // Get categories
  const categories = Object.keys(groupedModels).sort();

  // Filter models by search query
  const filteredModels = searchQuery 
    ? models.filter(model => 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : models;

  // Calculate pagination
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);

  // Handle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start space-x-3 border rounded-md p-3">
            <Skeleton className="h-4 w-4 mt-1" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-8"
          />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSearchQuery("")}
          disabled={!searchQuery}
        >
          Clear
        </Button>
      </div>
      
      {searchQuery ? (
        // Show flat list when searching
        <RadioGroup 
          value={selectedModel.id}
          onValueChange={(value) => {
            const model = models.find(m => m.id === value);
            if (model) onSelectModel(model);
          }}
        >
          {currentModels.length > 0 ? (
            currentModels.map((model) => (
              <ModelItem 
                key={model.id} 
                model={model} 
                isSelected={selectedModel.id === model.id}
                onClick={() => onSelectModel(model)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p>No models found matching "{searchQuery}"</p>
            </div>
          )}
        </RadioGroup>
      ) : (
        // Show categorized view in normal mode
        <div className="space-y-2">
          {categories.map((category) => (
            <Collapsible 
              key={category}
              open={expandedCategories[category] !== false} // Default to open
              onOpenChange={() => toggleCategory(category)}
            >
              <div className="flex items-center justify-between border rounded-md p-2 cursor-pointer hover:bg-muted/50"
                   onClick={() => toggleCategory(category)}>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    ({groupedModels[category].length} models)
                  </span>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {expandedCategories[category] !== false ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent>
                <RadioGroup 
                  value={selectedModel.id}
                  onValueChange={(value) => {
                    const model = models.find(m => m.id === value);
                    if (model) onSelectModel(model);
                  }}
                  className="mt-1 pl-2 space-y-2"
                >
                  {groupedModels[category].map((model) => (
                    <ModelItem 
                      key={model.id} 
                      model={model} 
                      isSelected={selectedModel.id === model.id}
                      onClick={() => onSelectModel(model)}
                      compact
                    />
                  ))}
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}

      {/* Show pagination only when searching and there are multiple pages */}
      {searchQuery && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => paginate(Math.max(1, currentPage - 1))} 
                className={cn("cursor-pointer", { "pointer-events-none opacity-50": currentPage === 1 })}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              
              // Adjust page numbers for many pages
              if (totalPages > 5) {
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
              }
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => paginate(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                className={cn("cursor-pointer", { "pointer-events-none opacity-50": currentPage === totalPages })}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      <div className="text-xs text-muted-foreground text-center">
        Showing {searchQuery ? `${currentModels.length} of ${filteredModels.length}` : models.length} models
      </div>
    </div>
  );
};

// Helper component for model items
const ModelItem = ({ 
  model, 
  isSelected, 
  onClick,
  compact = false
}: { 
  model: OpenRouterModel; 
  isSelected: boolean;
  onClick: () => void;
  compact?: boolean;
}) => {
  const isFree = model.pricing.prompt === "Free" || model.pricing.completion === "Free";
  
  return (
    <div 
      className={cn(
        "flex items-start space-x-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50",
        { "bg-primary/5 border-primary/30": isSelected }
      )}
      onClick={onClick}
    >
      <RadioGroupItem value={model.id} id={model.id} className="mt-1" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Label htmlFor={model.id} className="font-medium">
            {model.name}
          </Label>
          <div className="flex gap-1">
            {model.featured && (
              <Badge variant="default">Featured</Badge>
            )}
            {isFree && (
              <Badge variant="secondary">Free</Badge>
            )}
          </div>
        </div>
        {!compact && (
          <p className="text-sm text-muted-foreground mt-1">
            {model.description.length > 120 
              ? `${model.description.substring(0, 120)}...`
              : model.description}
          </p>
        )}
        <div className="flex gap-4 mt-1">
          <p className="text-xs text-muted-foreground">
            Context: {model.context_length.toLocaleString()} tokens
          </p>
          <p className="text-xs text-muted-foreground">
            Cost: {model.pricing.prompt} | {model.pricing.completion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
