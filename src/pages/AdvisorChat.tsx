
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { aiChatHistory as importedChatHistory, aiModels } from "@/data/mockData";
import { generateAIResponse } from "@/utils/aiUtils";
import { 
  OpenRouterModel, 
  defaultOpenRouterModels, 
  fetchOpenRouterModels, 
  sendMessageToOpenRouter 
} from "@/utils/openRouterUtils";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import ModelSelector from "@/components/advisor/ModelSelector";
import SystemPromptEditor from "@/components/advisor/SystemPromptEditor";
import ApiKeyInput from "@/components/advisor/ApiKeyInput";
import ChatMessage from "@/components/advisor/ChatMessage";

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
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a knowledgeable financial advisor focused on providing clear, accurate financial advice. Always consider the user's financial goals, risk tolerance, and time horizon. Provide balanced perspectives and avoid extreme positions. When uncertain, acknowledge limitations and suggest seeking professional advice."
  );
  
  // OpenRouter specific states
  const [aiProvider, setAIProvider] = useState<AIProvider>("local");
  const [openRouterApiKey, setOpenRouterApiKey] = useState("");
  const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModel[]>(defaultOpenRouterModels);
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState<OpenRouterModel>(defaultOpenRouterModels[0]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [loadModelSuccess, setLoadModelSuccess] = useState(false);
  const [loadModelError, setLoadModelError] = useState<string | undefined>(undefined);
  
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-paste API key from URL params on first load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get('apiKey');
    if (apiKey) {
      setOpenRouterApiKey(apiKey);
      // Optional: remove the API key from URL for security
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Use API key from query parameter or localStorage
      const storedApiKey = localStorage.getItem('openRouterApiKey');
      if (storedApiKey) {
        setOpenRouterApiKey(storedApiKey);
      }
    }
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Save API key to localStorage when it changes
  useEffect(() => {
    if (openRouterApiKey) {
      localStorage.setItem('openRouterApiKey', openRouterApiKey);
    }
  }, [openRouterApiKey]);
  
  // Fetch OpenRouter models when API key is provided
  const fetchModels = async () => {
    if (!openRouterApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key",
        variant: "destructive",
      });
      setLoadModelError("API key is required");
      return;
    }
    
    setIsLoadingModels(true);
    setLoadModelSuccess(false);
    setLoadModelError(undefined);
    
    try {
      const models = await fetchOpenRouterModels(openRouterApiKey);
      setOpenRouterModels(models);
      setSelectedOpenRouterModel(models[0]);
      setLoadModelSuccess(true);
      
      toast({
        title: "Models Loaded",
        description: `Successfully loaded ${models.length} models`,
      });
      
      // Auto-switch to OpenRouter provider when models load successfully
      setAIProvider("openrouter");
    } catch (error) {
      console.error("Error fetching models:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setLoadModelError(errorMessage);
      
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
  
  const clearConversation = () => {
    setMessages([{
      role: "assistant",
      content: "Hello! I'm your FinanceGuru AI advisor. How can I help with your financial questions today?",
      timestamp: new Date().toISOString()
    }]);
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
    setInputMessage(`Tell me about ${topic}`);
    
    // Focus the textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
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
            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>AI Model Settings</DialogTitle>
                <DialogDescription>
                  Choose which AI model powers your financial advisor
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="provider" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="provider" id="provider-tab">Provider</TabsTrigger>
                  <TabsTrigger value="models">Models</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="provider" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Card 
                        className={`p-4 cursor-pointer hover:bg-muted/50 ${aiProvider === 'local' ? 'border-primary' : ''}`}
                        onClick={() => setAIProvider('local')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Local AI</h3>
                          {aiProvider === 'local' && <Badge>Selected</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Basic AI responses with no API key required
                        </p>
                      </Card>
                      
                      <Card 
                        className={`p-4 cursor-pointer hover:bg-muted/50 ${aiProvider === 'openrouter' ? 'border-primary' : ''}`}
                        onClick={() => setAIProvider('openrouter')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">OpenRouter</h3>
                          <Badge variant="secondary">Advanced</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Access to multiple AI models with API key
                        </p>
                      </Card>
                    </div>
                    
                    {aiProvider === "openrouter" && (
                      <ApiKeyInput
                        value={openRouterApiKey}
                        onChange={setOpenRouterApiKey}
                        onLoad={fetchModels}
                        isLoading={isLoadingModels}
                        loadSuccess={loadModelSuccess}
                        loadError={loadModelError}
                      />
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="models" className="space-y-4 mt-4">
                  {aiProvider === "local" ? (
                    <ModelSelector
                      models={aiModels.map(model => ({
                        id: model.id,
                        name: model.name,
                        description: model.description,
                        context_length: 4096,
                        pricing: {
                          prompt: model.type === "premium" ? "$1.00/1M tokens" : "Free",
                          completion: model.type === "premium" ? "$2.00/1M tokens" : "Free"
                        },
                        featured: model.type === "premium",
                        category: model.type.charAt(0).toUpperCase() + model.type.slice(1)
                      }))}
                      selectedModel={{
                        id: selectedModel.id,
                        name: selectedModel.name,
                        description: selectedModel.description,
                        context_length: 4096,
                        pricing: {
                          prompt: selectedModel.type === "premium" ? "$1.00/1M tokens" : "Free",
                          completion: selectedModel.type === "premium" ? "$2.00/1M tokens" : "Free"
                        },
                        featured: selectedModel.type === "premium",
                        category: selectedModel.type.charAt(0).toUpperCase() + selectedModel.type.slice(1)
                      }}
                      onSelectModel={(model) => {
                        const aiModel = aiModels.find(m => m.id === model.id);
                        if (aiModel) setSelectedModel(aiModel);
                      }}
                      isLoading={false}
                    />
                  ) : (
                    <ModelSelector
                      models={openRouterModels}
                      selectedModel={selectedOpenRouterModel}
                      onSelectModel={setSelectedOpenRouterModel}
                      isLoading={isLoadingModels}
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4 mt-4">
                  <SystemPromptEditor
                    value={systemPrompt}
                    onChange={setSystemPrompt}
                  />
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
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
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
