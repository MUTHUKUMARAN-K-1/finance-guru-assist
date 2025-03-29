
import { useState, useEffect } from "react";
import { User, Bot, Copy, CheckCircle2, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
  };
  
  // Check if content contains code blocks
  const hasCodeBlock = content.includes("```");
  
  // Parse content for code blocks
  const renderContent = () => {
    if (!hasCodeBlock) {
      return <p className="mb-0 leading-relaxed whitespace-pre-line">{content}</p>;
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
            <div key={index} className="my-2 relative">
              <div className="flex justify-between items-center bg-slate-800 px-4 py-1 text-xs text-slate-100 rounded-t-md">
                <span>{language || "Code"}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-slate-100 hover:text-white hover:bg-slate-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(code);
                    setCopied(true);
                  }}
                >
                  {copied ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-md overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
      }
      
      // Regular text
      return <p key={index} className="mb-2 leading-relaxed whitespace-pre-line">{segment}</p>;
    });
  };
  
  return (
    <div 
      className={`flex gap-3 ${
        role === "assistant" ? "justify-start" : "justify-end"
      }`}
    >
      {role === "assistant" && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
      )}
      
      <div className={`group relative rounded-lg p-3 ${
        role === "assistant" 
          ? "bg-muted text-muted-foreground max-w-[80%]" 
          : "bg-primary text-primary-foreground ml-auto max-w-[80%]"
      }`}>
        <div className="space-y-2">
          <div className="prose dark:prose-invert">
            {renderContent()}
          </div>
          <div className={`flex items-center justify-between pt-2 text-xs ${
            role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/70"
          }`}>
            <div>{formatTimestamp(timestamp)}</div>
            
            {role === "assistant" && (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={copyToClipboard}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {role === "user" && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
