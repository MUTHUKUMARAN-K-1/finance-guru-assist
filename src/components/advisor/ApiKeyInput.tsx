
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  onLoad: () => void;
  isLoading: boolean;
  loadSuccess?: boolean;
  loadError?: string;
}

const ApiKeyInput = ({ 
  value, 
  onChange, 
  onLoad, 
  isLoading,
  loadSuccess,
  loadError 
}: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="space-y-3">
      <Label htmlFor="openrouter-api-key" className="font-medium">OpenRouter API Key</Label>
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="openrouter-api-key"
              type={showKey ? "text" : "password"}
              placeholder="Enter your OpenRouter API key"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                "pr-10",
                loadSuccess && "border-green-500",
                loadError && "border-red-500"
              )}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full rounded-l-none"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button 
            onClick={onLoad} 
            disabled={!value || isLoading}
          >
            {isLoading ? "Loading..." : "Load Models"}
          </Button>
        </div>
        
        <div className="text-xs space-y-2">
          <p className="text-muted-foreground">
            Get your API key at <a 
              href="https://openrouter.ai/keys" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              openrouter.ai/keys
            </a>
          </p>
          
          {isLoading && (
            <div className="py-1">
              <Progress value={75} className="h-1" />
              <p className="text-xs text-center mt-1">Loading models from OpenRouter...</p>
            </div>
          )}
          
          {loadSuccess && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Models loaded successfully
              </AlertDescription>
            </Alert>
          )}
          
          {loadError && (
            <Alert className="bg-red-50 text-red-800 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {loadError}
              </AlertDescription>
            </Alert>
          )}
          
          {!value && (
            <div className="flex items-center gap-2 text-amber-500 text-sm mt-2">
              <AlertCircle className="h-4 w-4" />
              <span>API key required to use OpenRouter models</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;
