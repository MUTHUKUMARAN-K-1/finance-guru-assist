
import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  SendHorizontal, 
  Settings, 
  User, 
  Lightbulb,
  Plus, 
  ChevronRight, 
  Trash,
  Copy,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { aiChatHistory, aiModels } from "@/data/mockData";

type Message = {
  role: "assistant" | "user";
  content: string;
  timestamp: string;
};

type AIModel = {
  id: string;
  name: string;
  type: string;
  description: string;
};

const AdvisorChat = () => {
  const [messages, setMessages] = useState<Message[]>(aiChatHistory);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<AIModel>(aiModels[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Reset copy message state after 2 seconds
  useEffect(() => {
    if (copiedMessageId) {
      const timer = setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copiedMessageId]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    setIsSending(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getSimulatedResponse(inputMessage),
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsSending(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const copyToClipboard = (text: string, messageIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(`${messageIndex}`);
  };
  
  const clearConversation = () => {
    setMessages([{
      role: "assistant",
      content: "Hello! I'm your FinanceGuru AI advisor. How can I help with your financial questions today?",
      timestamp: new Date().toISOString()
    }]);
  };
  
  // Format timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Simulated AI response based on user input
  const getSimulatedResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes("budget") || userInputLower.includes("spending")) {
      return "Creating a budget is a great first step to financial wellness. I recommend using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Would you like me to help you set up a basic budget based on your income?";
    } else if (userInputLower.includes("invest") || userInputLower.includes("stock")) {
      return "Investment strategies should be tailored to your goals, timeline, and risk tolerance. For beginners, I typically recommend starting with low-cost index funds that provide broad market exposure. Would you like more specific investment recommendations based on your situation?";
    } else if (userInputLower.includes("debt") || userInputLower.includes("loan")) {
      return "When dealing with debt, you have two main strategies: the snowball method (paying smallest debts first) or the avalanche method (paying highest-interest debts first). The avalanche method saves more money, but the snowball method provides psychological wins. Which approach appeals to you more?";
    } else if (userInputLower.includes("save") || userInputLower.includes("emergency")) {
      return "Building an emergency fund should be a top priority. Aim to save 3-6 months of essential expenses in a readily accessible account. This provides financial security and prevents you from going into debt when unexpected expenses arise. Would you like help calculating your target emergency fund amount?";
    } else if (userInputLower.includes("retire") || userInputLower.includes("401k")) {
      return "Retirement planning is about balancing current needs with future security. I generally recommend contributing at least enough to get any employer match on retirement accounts, then working toward maxing out tax-advantaged accounts like 401(k)s and IRAs. Would you like to discuss retirement planning strategies in more detail?";
    } else {
      return "That's a great financial question. To give you the most helpful advice, could you provide a bit more information about your specific situation? Details about your financial goals, timeline, and current financial status would help me tailor my response.";
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">AI Financial Advisor</h1>
          <Badge variant="outline" className="ml-2">
            {selectedModel.name}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>AI Model Settings</DialogTitle>
                <DialogDescription>
                  Choose which AI model powers your financial advisor
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="models" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="models">Models</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="models" className="space-y-4 mt-4">
                  <RadioGroup 
                    defaultValue={selectedModel.id}
                    onValueChange={(value) => {
                      const model = aiModels.find(m => m.id === value);
                      if (model) setSelectedModel(model);
                    }}
                  >
                    {aiModels.map((model) => (
                      <div 
                        key={model.id} 
                        className="flex items-start space-x-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedModel(model)}
                      >
                        <RadioGroupItem value={model.id} id={model.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={model.id} className="font-medium">
                              {model.name}
                            </Label>
                            <Badge variant={model.type === "premium" ? "default" : "outline"}>
                              {model.type === "premium" ? "Premium" : 
                               model.type === "standard" ? "Standard" : 
                               model.type === "free" ? "Free" : "Offline"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {model.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea 
                      id="system-prompt"
                      placeholder="Customize the AI's behavior with a system prompt"
                      className="min-h-[120px]"
                      defaultValue="You are a knowledgeable financial advisor focused on providing clear, accurate financial advice. Always consider the user's financial goals, risk tolerance, and time horizon. Provide balanced perspectives and avoid extreme positions. When uncertain, acknowledge limitations and suggest seeking professional advice."
                    />
                    <p className="text-xs text-muted-foreground">
                      The system prompt helps define how the AI responds to your financial questions.
                    </p>
                  </div>
                  
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="text-sm font-medium">Response Preferences</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="detail-level" className="checkbox" defaultChecked />
                        <Label htmlFor="detail-level">Detailed responses</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="include-examples" className="checkbox" defaultChecked />
                        <Label htmlFor="include-examples">Include examples</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="cite-sources" className="checkbox" />
                        <Label htmlFor="cite-sources">Cite sources</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="follow-up" className="checkbox" defaultChecked />
                        <Label htmlFor="follow-up">Suggest follow-ups</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsSettingsOpen(false)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="icon" onClick={clearConversation}>
            <Trash className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex gap-3 ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              
              <div className={`group relative rounded-lg p-3 ${
                message.role === "assistant" 
                  ? "bg-muted text-muted-foreground max-w-[80%]" 
                  : "bg-primary text-primary-foreground ml-auto max-w-[80%]"
              }`}>
                <div className="space-y-2">
                  <div className="prose dark:prose-invert">
                    <p className="mb-0 leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                  </div>
                  <div className={`flex items-center justify-between pt-2 text-xs ${
                    message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/70"
                  }`}>
                    <div>{formatTimestamp(message.timestamp)}</div>
                    
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => copyToClipboard(message.content, index)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {copiedMessageId === `${index}` ? (
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
              
              {message.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          
          {isSending && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg p-3 bg-muted text-muted-foreground max-w-[80%]">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="w-64 border-l hidden lg:block overflow-y-auto p-4">
          <h3 className="font-medium mb-3">Suggested Topics</h3>
          <div className="space-y-2">
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Emergency Fund Basics</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Debt Reduction Strategies</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Beginner Investment Guide</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Budgeting Best Practices</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Retirement Planning</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="font-medium mb-3">Recently Asked</h3>
          <div className="space-y-2">
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors">
              How much should I save for retirement?
            </button>
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors">
              What's the difference between a Roth and Traditional IRA?
            </button>
            <button className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors">
              How do I improve my credit score?
            </button>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="font-medium mb-3">Model Information</h3>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <span className="font-medium">Current Model:</span> {selectedModel.name}
            </p>
            <p>
              <span className="font-medium">Service Type:</span> {selectedModel.type.charAt(0).toUpperCase() + selectedModel.type.slice(1)}
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedModel.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Ask a financial question..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none rounded-lg"
          />
          <Button onClick={handleSendMessage} size="icon" className="h-[60px] shrink-0">
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          AI assistants can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default AdvisorChat;
