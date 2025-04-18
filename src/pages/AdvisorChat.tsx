
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Bot, User } from "lucide-react";
import ModelSelector from "@/components/advisor/ModelSelector";
import ApiKeyInput from "@/components/advisor/ApiKeyInput";
import SystemPromptEditor from "@/components/advisor/SystemPromptEditor";
import ChatMessage from "@/components/advisor/ChatMessage";
import { toast } from "sonner";

export interface Message {
  content: string;
  role: "user" | "assistant";
}

export default function AdvisorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful financial advisor assistant. Provide clear, concise advice on financial topics. Don't recommend specific investments or make promises about returns."
  );
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of messages when a new message is added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    if (!apiKey) {
      toast.error("Please enter an API key to continue");
      return;
    }
    
    // Add user message
    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Send the request to OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">AI Financial Advisor</h1>
        <p className="text-neutral-600">
          Get personalized financial guidance using advanced AI technology
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Settings</CardTitle>
              <CardDescription>Configure your AI assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ModelSelector 
                value={model} 
                onChange={setModel} 
              />
              
              <ApiKeyInput 
                value={apiKey}
                onChange={setApiKey}
              />
              
              <SystemPromptEditor 
                value={systemPrompt}
                onChange={setSystemPrompt}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Chat Interface */}
        <Card className="lg:col-span-3 flex flex-col h-[80vh]">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Bot className="mr-2 h-5 w-5" />
              Financial Advisor Chat
            </CardTitle>
            <CardDescription>
              Ask questions about budgeting, investing, retirement planning, and more
            </CardDescription>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                  <p className="text-muted-foreground">
                    No messages yet. Start by sending a message below.
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ChatMessage 
                    key={index}
                    content={msg.content}
                    role={msg.role}
                  />
                ))
              )}
              
              {isLoading && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="animate-pulse flex space-x-1 items-center">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="ml-2">AI is thinking...</span>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Ask something about your finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <SendHorizontal className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
