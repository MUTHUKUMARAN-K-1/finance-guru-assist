
import { useState, useEffect, useCallback } from "react";
import { User, Bot, Copy, CheckCircle2, Code, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  
  // Format timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }, []);
  
  // Check if content contains code blocks
  const hasCodeBlock = content.includes("```");
  
  // Parse content for code blocks and links
  const renderContent = () => {
    if (!hasCodeBlock) {
      // Process normal text for links
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      const parts = content.split(linkRegex);
      
      return (
        <div className="leading-relaxed whitespace-pre-line">
          {parts.map((part, i) => {
            if (part.match(linkRegex)) {
              return (
                <a 
                  key={i} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  {part.length > 40 ? `${part.substring(0, 40)}...` : part}
                  <ExternalLink className="h-3 w-3" />
                </a>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>
      );
    }
    
    // Split by code blocks
    const segments = content.split(/(```[a-z]*\n[\s\S]*?\n```)/g);
    
    return segments.map((segment, index) => {
      // Check if this segment is a code block
      if (segment.startsWith("```") && segment.endsWith("```")) {
        // Extract language and code
        const match = segment.match(/```([a-z]*)\n([\s\S]*?)\n```/);
        
        if (match) {
          const [, language, code] = match;
          
          return (
            <div key={index} className="my-4 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-center bg-slate-800 px-4 py-2 text-xs text-slate-100 font-mono">
                <span className="font-medium">{language || "Code"}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-slate-100 hover:text-white hover:bg-slate-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(code);
                      }}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? 'Copied!' : 'Copy code'}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <pre className="bg-slate-950 text-slate-50 p-4 overflow-x-auto text-sm font-mono">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
      }
      
      // Process normal text for links
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      const parts = segment.split(linkRegex);
      
      return (
        <div key={index} className="mb-3 leading-relaxed whitespace-pre-line">
          {parts.map((part, i) => {
            if (part.match(linkRegex)) {
              return (
                <a 
                  key={i} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  {part.length > 40 ? `${part.substring(0, 40)}...` : part}
                  <ExternalLink className="h-3 w-3" />
                </a>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div 
      className={cn(
        "animate-fade-in flex gap-4 my-6 w-full max-w-4xl mx-auto",
        role === "assistant" ? "justify-start" : "justify-end"
      )}
    >
      {role === "assistant" && (
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Bot className="h-5 w-5" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "group relative rounded-xl p-4 max-w-[85%] transition-all",
        role === "assistant" 
          ? "bg-muted text-foreground shadow-sm border border-border/50" 
          : "bg-primary text-primary-foreground shadow-md"
      )}>
        <div className="space-y-2">
          <div className="prose dark:prose-invert max-w-none">
            {renderContent()}
          </div>
          
          <div className={cn(
            "flex items-center justify-between pt-2 text-xs",
            role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/70"
          )}>
            <div className="font-medium">{formatTimestamp(timestamp)}</div>
            
            {role === "assistant" && (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => copyToClipboard(content)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? 'Copied!' : 'Copy message'}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {role === "user" && (
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <User className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
