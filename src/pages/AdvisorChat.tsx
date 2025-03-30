
import { useState } from "react";
import { Send, Bot, ChevronDown, Settings, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ModelSelector } from "@/components/advisor/ModelSelector";
import { ApiKeyInput } from "@/components/advisor/ApiKeyInput";
import { SystemPromptEditor } from "@/components/advisor/SystemPromptEditor";
import ChatMessage from "@/components/advisor/ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { sendMessageToAI } from "@/utils/aiUtils";

const AdvisorChat = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI financial advisor. How can I help you with your financial questions today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful financial advisor. Provide useful advice on investments, savings, budgeting, and other financial topics. Keep your answers concise and easy to understand."
  );
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    
    try {
      const response = await sendMessageToAI(
        [...messages, userMessage],
        systemPrompt,
        apiKey,
        selectedModel
      );
      
      if (response) {
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
      } else {
        toast({
          title: "Error",
          description: "Failed to get a response from AI",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-full flex flex-col space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-lg shadow-sm border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">AI Financial Advisor</h1>
          <p className="text-muted-foreground text-sm">Ask questions about your financial journey and get personalized guidance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <ModelSelector 
            selectedModel={selectedModel} 
            onModelChange={setSelectedModel} 
          />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>AI Settings</SheetTitle>
                <SheetDescription>
                  Configure your AI assistant preferences
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-4 space-y-4">
                <ApiKeyInput apiKey={apiKey} onApiKeyChange={setApiKey} />
                <SystemPromptEditor 
                  systemPrompt={systemPrompt} 
                  onSystemPromptChange={setSystemPrompt} 
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col rounded-lg border shadow-sm overflow-hidden">
        <div className="bg-card px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border">
              <Bot className="h-5 w-5 text-primary" />
            </Avatar>
            <div>
              <h3 className="text-sm font-medium">Financial Advisor</h3>
              <p className="text-xs text-muted-foreground">AI-powered assistant</p>
            </div>
          </div>
          
          <Select defaultValue="finance">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="finance">General Finance</SelectItem>
              <SelectItem value="investing">Investing</SelectItem>
              <SelectItem value="saving">Saving Strategies</SelectItem>
              <SelectItem value="retirement">Retirement Planning</SelectItem>
              <SelectItem value="debt">Debt Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <ScrollArea className="flex-1 p-4 bg-slate-50">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((msg, idx) => (
              <ChatMessage 
                key={idx} 
                message={msg.content} 
                isUser={msg.role === "user"}
              />
            ))}
            {loading && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-background">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2 max-w-3xl mx-auto"
          >
            <Textarea
              placeholder="Type your question here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-12 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              type="submit" 
              disabled={loading || !message.trim()}
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <div className="mt-2 text-xs text-center text-muted-foreground max-w-3xl mx-auto">
            For detailed financial advice, please consult with a qualified financial advisor
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorChat;
