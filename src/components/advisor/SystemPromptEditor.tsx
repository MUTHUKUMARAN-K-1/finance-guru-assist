
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  CheckCircle2, 
  RefreshCw,
  Lightbulb
} from "lucide-react";

interface SystemPromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const SystemPromptEditor = ({ value, onChange }: SystemPromptEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  
  const templatePrompts = [
    {
      name: "Financial Advisor",
      prompt: "You are a knowledgeable financial advisor focused on providing clear, accurate financial advice. Always consider the user's financial goals, risk tolerance, and time horizon. Provide balanced perspectives and avoid extreme positions. When uncertain, acknowledge limitations and suggest seeking professional advice."
    },
    {
      name: "Investment Specialist",
      prompt: "You are an investment specialist focused on helping users understand different investment opportunities. Explain concepts clearly with concrete examples. Always discuss both potential returns and risks. Avoid making specific investment recommendations or predictions. Remind users of the importance of diversification and their own due diligence."
    },
    {
      name: "Budgeting Coach",
      prompt: "You are a budgeting coach focused on helping users manage their personal finances. Provide practical advice on saving, tracking expenses, and establishing healthy financial habits. Emphasize the importance of emergency funds and prioritizing needs over wants. Encourage sustainable behavioral changes rather than quick fixes."
    },
    {
      name: "Financial Educator",
      prompt: "You are a financial educator whose goal is to improve financial literacy. Explain financial concepts in simple, accessible language with real-world examples. Avoid jargon when possible, and define specialized terms when used. Help users build a foundational understanding of personal finance topics to empower their decision-making."
    }
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };
  
  const useTemplate = (template: string) => {
    onChange(template);
  };
  
  const resetToDefault = () => {
    onChange(templatePrompts[0].prompt);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="system-prompt" className="font-medium">System Prompt</Label>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyToClipboard}
            className="h-7 w-7 p-0"
          >
            {hasCopied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetToDefault}
            className="h-7 w-7 p-0"
            title="Reset to default"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Collapsible 
            open={isOpen} 
            onOpenChange={setIsOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>
      
      <Textarea 
        id="system-prompt"
        placeholder="Customize the AI's behavior with a system prompt"
        className="min-h-[120px] resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      <Collapsible open={isOpen}>
        <CollapsibleContent className="mt-2 space-y-2">
          <p className="text-xs text-muted-foreground">
            The system prompt helps define how the AI responds to your financial questions.
          </p>
          
          <div className="space-y-2 border-t pt-2">
            <p className="text-sm font-medium flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              Template Prompts
            </p>
            <div className="grid gap-2">
              {templatePrompts.map((template, index) => (
                <div 
                  key={index}
                  className="border rounded-md p-2 hover:bg-muted/50 cursor-pointer"
                  onClick={() => useTemplate(template.prompt)}
                >
                  <p className="text-sm font-medium">{template.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{template.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SystemPromptEditor;
