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
  CheckCircle2,
  AlertCircle
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
import { Progress } from "@/components/ui/progress";
import { aiChatHistory as importedChatHistory, aiModels } from "@/data/mockData";
import { generateAIResponse } from "@/utils/aiUtils";
import { 
  OpenRouterModel, 
  defaultOpenRouterModels, 
  fetchOpenRouterModels, 
  sendMessageToOpenRouter 
} from "@/utils/openRouterUtils";
import { useToast } from "@/hooks/use-toast";

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

type AIProvider = "local" | "openrouter";

// Convert imported chat history to the correct Message type
const aiChatHistory: Message[] = importedChatHistory.map(message => ({
  ...message,
  role: message.role as "assistant" | "user"
}));

const AdvisorChat = () => {
  const [messages, setMessages] = useState<Message[]>(aiChatHistory);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<AIModel>(aiModels[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a knowledgeable financial advisor focused on providing clear, accurate financial advice. Always consider the user's financial goals, risk tolerance, and time horizon. Provide balanced perspectives and avoid extreme positions. When uncertain, acknowledge limitations and suggest seeking professional advice."
  );
  
  // OpenRouter specific states
  const [aiProvider, setAIProvider] = useState<AIProvider>("local");
  const [openRouterApiKey, setOpenRouterApiKey] = useState("");
  const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModel[]>(defaultOpenRouterModels);
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState<OpenRouterModel>(defaultOpenRouterModels[0]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  
  const { toast } = useToast();
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
  
  // Fetch OpenRouter models when API key is provided
  const fetchModels = async () => {
    if (!openRouterApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoadingModels(true);
    try {
      const models = await fetchOpenRouterModels(openRouterApiKey);
      setOpenRouterModels(models);
      setSelectedOpenRouterModel(models[0]);
      toast({
        title: "Models Loaded",
        description: `Successfully loaded ${models.length} models`,
      });
    } catch (error) {
      console.error("Error fetching models:", error);
      toast({
        title: "Error Loading Models",
        description: "Could not load models. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingModels(false);
    }
  };
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    setIsSending(true);
    
    try {
      let aiResponse: Message;
      
      if (aiProvider === "openrouter" && openRouterApiKey) {
        // Create message history for context (last 10 messages)
        const recentMessages = [...messages.slice(-10), newUserMessage].map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        
        // Send to OpenRouter
        const response = await sendMessageToOpenRouter(
          openRouterApiKey,
          selectedOpenRouterModel.id,
          recentMessages,
          systemPrompt
        );
        
        aiResponse = {
          role: "assistant",
          content: response,
          timestamp: new Date().toISOString(),
        };
      } else {
        // Use local response generator
        aiResponse = {
          role: "assistant",
          content: generateAIResponse(inputMessage),
          timestamp: new Date().toISOString(),
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Using local fallback.",
        variant: "destructive",
      });
      
      // Fallback to local
      const fallbackResponse: Message = {
        role: "assistant",
        content: generateAIResponse(inputMessage) + "\n\n(Note: This is a locally generated fallback response due to an error.)",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsSending(false);
    }
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
  
  // Suggested topics based on financial categories
  const suggestedTopics = [
    { icon: <Lightbulb className="h-4 w-4" />, text: "Emergency Fund Basics" },
    { icon: <Lightbulb className="h-4 w-4" />, text: "Debt Reduction Strategies" },
    { icon: <Lightbulb className="h-4 w-4" />, text: "Beginner Investment Guide" },
    { icon: <Lightbulb className="h-4 w-4" />, text: "Budgeting Best Practices" },
    { icon: <Lightbulb className="h-4 w-4" />, text: "Retirement Planning" },
    { icon: <Lightbulb className="h-4 w-4" />, text: "Credit Score Improvement" },
    { icon: <Lightbulb className="h-4 w-4" />, text: "Tax Optimization Tips" },
    { icon: <Lightbulb className="h-4 w-4" />, text: "First-Time Homebuyer Guide" },
  ];
  
  const handleSuggestedTopic = (topic: string) => {
    const newUserMessage: Message = {
      role: "user",
      content: `Tell me about ${topic}`,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newUserMessage]);
    setIsSending(true);
    
    // Use the same message handling logic
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">AI Financial Advisor</h1>
          <Badge variant="outline" className="ml-2">
            {aiProvider === "local" ? selectedModel.name : selectedOpenRouterModel.name}
          </Badge>
          {aiProvider === "openrouter" && (
            <Badge variant="secondary" className="ml-2">
              OpenRouter
            </Badge>
          )}
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
              
              <Tabs defaultValue="provider" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="provider">Provider</TabsTrigger>
                  <TabsTrigger value="models">Models</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="provider" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <RadioGroup 
                      value={aiProvider}
                      onValueChange={(value) => setAIProvider(value as AIProvider)}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="local" id="local" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="local" className="font-medium">Local AI</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Use built-in AI capabilities with no API key required. Limited capabilities but always available.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="openrouter" id="openrouter" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="openrouter" className="font-medium">OpenRouter</Label>
                            <Badge>Advanced</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Connect to multiple AI models through OpenRouter. Requires API key.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {aiProvider === "openrouter" && (
                      <div className="space-y-2">
                        <Label htmlFor="openrouter-api-key">OpenRouter API Key</Label>
                        <div className="flex gap-2">
                          <Input
                            id="openrouter-api-key"
                            type="password"
                            placeholder="Enter your OpenRouter API key"
                            value={openRouterApiKey}
                            onChange={(e) => setOpenRouterApiKey(e.target.value)}
                          />
                          <Button 
                            onClick={fetchModels} 
                            disabled={!openRouterApiKey || isLoadingModels}
                          >
                            {isLoadingModels ? "Loading..." : "Load Models"}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Get your API key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">openrouter.ai/keys</a>
                        </p>
                        
                        {isLoadingModels && (
                          <div className="py-2">
                            <Progress value={75} />
                            <p className="text-xs text-center mt-1">Loading models...</p>
                          </div>
                        )}
                        
                        {!openRouterApiKey && (
                          <div className="flex items-center gap-2 text-amber-500 text-sm mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>API key required to use OpenRouter models</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="models" className="space-y-4 mt-4">
                  {aiProvider === "local" ? (
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
                  ) : (
                    <div className="space-y-4">
                      {openRouterApiKey ? (
                        <RadioGroup 
                          value={selectedOpenRouterModel.id}
                          onValueChange={(value) => {
                            const model = openRouterModels.find(m => m.id === value);
                            if (model) setSelectedOpenRouterModel(model);
                          }}
                        >
                          {openRouterModels.map((model) => (
                            <div 
                              key={model.id} 
                              className="flex items-start space-x-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50"
                              onClick={() => setSelectedOpenRouterModel(model)}
                            >
                              <RadioGroupItem value={model.id} id={model.id} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={model.id} className="font-medium">
                                    {model.name}
                                  </Label>
                                  {model.featured && (
                                    <Badge variant="default">Featured</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {model.description}
                                </p>
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
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="text-center py-8 space-y-3">
                          <AlertCircle className="h-8 w-8 mx-auto text-amber-500" />
                          <p>Please enter your OpenRouter API key in the Provider tab</p>
                          <Button 
                            variant="outline" 
                            onClick={() => document.getElementById("provider-tab")?.click()}
                          >
                            Go to Provider Tab
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea 
                      id="system-prompt"
                      placeholder="Customize the AI's behavior with a system prompt"
                      className="min-h-[120px]"
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
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
            {suggestedTopics.map((topic, index) => (
              <button 
                key={index}
                className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-between"
                onClick={() => handleSuggestedTopic(topic.text)}
              >
                <div className="flex items-center gap-2">
                  {topic.icon}
                  <span>{topic.text}</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="font-medium mb-3">Recently Asked</h3>
          <div className="space-y-2">
            <button 
              className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => handleSuggestedTopic("retirement planning")}
            >
              How much should I save for retirement?
            </button>
            <button 
              className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => handleSuggestedTopic("Roth vs Traditional IRA")}
            >
              What's the difference between a Roth and Traditional IRA?
            </button>
            <button 
              className="text-sm text-left w-full p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => handleSuggestedTopic("improve credit score")}
            >
              How do I improve my credit score?
            </button>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="font-medium mb-3">Model Information</h3>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <span className="font-medium">Current Model:</span> {aiProvider === "local" ? selectedModel.name : selectedOpenRouterModel.name}
            </p>
            <p>
              <span className="font-medium">Service Type:</span> {aiProvider === "local" ? selectedModel.type.charAt(0).toUpperCase() + selectedModel.type.slice(1) : "OpenRouter"}
            </p>
            <p className="text-xs text-muted-foreground">
              {aiProvider === "local" ? selectedModel.description : selectedOpenRouterModel.description}
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
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            AI assistants can make mistakes. Consider checking important information.
          </p>
          {aiProvider === "openrouter" && (
            <p className="text-xs">
              Using: <span className="font-medium">{selectedOpenRouterModel.name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorChat;
