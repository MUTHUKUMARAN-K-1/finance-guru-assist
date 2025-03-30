
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Bot, 
  SendHorizontal, 
  Settings, 
  User, 
  Lightbulb,
  Plus, 
  ChevronRight, 
  Trash,
  MoveRight,
  Brain,
  Info,
  Rabbit,
  BookOpenText,
  Sparkles,
  Clock,
  Search,
  Loader2,
  XCircle,
  CheckCircle,
  FileText,
  BarChartBig,
  BanknoteIcon,
  ArrowRightCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// Import our components
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
type ChatSession = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
};

// Convert imported chat history to the correct Message type
const aiChatHistory: Message[] = importedChatHistory.map(message => ({
  ...message,
  role: message.role as "assistant" | "user"
}));

// Sample suggested questions by category
const suggestedQuestions = {
  basics: [
    "How should I start investing with limited funds?",
    "What's the difference between a Roth and Traditional IRA?",
    "How do I build an emergency fund?",
    "What's the 50/30/20 budgeting rule?"
  ],
  investing: [
    "What is dollar-cost averaging?",
    "How should I diversify my investment portfolio?",
    "What are index funds and why are they recommended?",
    "When should I start investing for retirement?"
  ],
  planning: [
    "How much should I save for retirement?",
    "What's the best way to pay off credit card debt?",
    "How do I create a financial plan?",
    "Should I pay off my mortgage early or invest?"
  ],
  taxes: [
    "What tax deductions am I eligible for?",
    "How do capital gains taxes work?",
    "What's the difference between tax credits and deductions?",
    "How can I reduce my tax liability legally?"
  ]
};

const AdvisorChat = () => {
  // API & Model states
  const [apiProvider, setAPIProvider] = useState<AIProvider>("local");
  const [selectedModel, setSelectedModel] = useState<AIModel>(aiModels[0]);
  const [openRouterApiKey, setOpenRouterApiKey] = useState("");
  const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModel[]>(defaultOpenRouterModels);
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState<OpenRouterModel>(defaultOpenRouterModels[0]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [loadModelSuccess, setLoadModelSuccess] = useState(false);
  const [loadModelError, setLoadModelError] = useState<string | undefined>(undefined);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a knowledgeable financial advisor focused on providing clear, accurate financial advice. Always consider the user's financial goals, risk tolerance, and time horizon. Provide balanced perspectives and avoid extreme positions. When uncertain, acknowledge limitations and suggest seeking professional advice."
  );
  
  // UI states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [activeQuestionCategory, setActiveQuestionCategory] = useState("basics");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Chat states
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "default",
      title: "Financial Planning Discussion",
      lastMessage: "Hello! I'm your FinanceGuru AI advisor. How can I help with your financial questions today?",
      timestamp: new Date().toISOString(),
      messages: aiChatHistory
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState("default");
  const [messages, setMessages] = useState<Message[]>(aiChatHistory);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-paste API key from URL params on first load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get('apiKey');
    if (apiKey) {
      setOpenRouterApiKey(apiKey);
      // Optional: remove the API key from URL for security
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Auto load models if key provided
      fetchModels(apiKey);
    } else {
      // Use API key from localStorage
      const storedApiKey = localStorage.getItem('openRouterApiKey');
      if (storedApiKey) {
        setOpenRouterApiKey(storedApiKey);
        fetchModels(storedApiKey);
      }
    }
  }, []);
  
  // Set active session messages when session changes
  useEffect(() => {
    const activeSession = sessions.find(session => session.id === activeSessionId);
    if (activeSession) {
      setMessages(activeSession.messages);
    }
  }, [activeSessionId, sessions]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSending]);
  
  // Save API key to localStorage when it changes
  useEffect(() => {
    if (openRouterApiKey) {
      localStorage.setItem('openRouterApiKey', openRouterApiKey);
    }
  }, [openRouterApiKey]);
  
  // Fetch OpenRouter models when API key is provided
  const fetchModels = async (apiKey: string = openRouterApiKey) => {
    if (!apiKey) {
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
      const models = await fetchOpenRouterModels(apiKey);
      setOpenRouterModels(models);
      setSelectedOpenRouterModel(models[0]);
      setLoadModelSuccess(true);
      
      toast({
        title: "Models Loaded",
        description: `Successfully loaded ${models.length} models`,
      });
      
      // Auto-switch to OpenRouter provider
      setAPIProvider("openrouter");
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
  
  // Create a new chat session
  const createNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    const welcomeMessage: Message = {
      role: "assistant",
      content: "Hello! I'm your FinanceGuru AI advisor. How can I help with your financial questions today?",
      timestamp: new Date().toISOString()
    };
    
    const newSession: ChatSession = {
      id: newSessionId,
      title: `New Chat ${sessions.length + 1}`,
      lastMessage: welcomeMessage.content,
      timestamp: welcomeMessage.timestamp,
      messages: [welcomeMessage]
    };
    
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setMessages([welcomeMessage]);
    
    // Auto focus the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  
  // Delete a chat session
  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    
    // If we're deleting the active session, switch to another one
    if (sessionId === activeSessionId) {
      const remainingSessions = sessions.filter(session => session.id !== sessionId);
      if (remainingSessions.length > 0) {
        setActiveSessionId(remainingSessions[0].id);
      } else {
        createNewSession();
      }
    }
  };
  
  // Update the active session
  const updateActiveSession = (newMessages: Message[]) => {
    const lastMessage = newMessages[newMessages.length - 1];
    
    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? {
            ...session,
            messages: newMessages,
            lastMessage: lastMessage.content.length > 60 
              ? lastMessage.content.substring(0, 60) + '...' 
              : lastMessage.content,
            timestamp: lastMessage.timestamp
          }
        : session
    ));
  };
  
  // Send a message to the AI
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    updateActiveSession(updatedMessages);
    setInputMessage("");
    setIsSending(true);
    
    try {
      let aiResponse: Message;
      
      if (apiProvider === "openrouter" && openRouterApiKey) {
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
        const response = generateAIResponse(inputMessage);
        aiResponse = {
          role: "assistant",
          content: response,
          timestamp: new Date().toISOString(),
        };
      }
      
      const newMessages = [...updatedMessages, aiResponse];
      setMessages(newMessages);
      updateActiveSession(newMessages);
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
      
      const newMessages = [...updatedMessages, fallbackResponse];
      setMessages(newMessages);
      updateActiveSession(newMessages);
    } finally {
      setIsSending(false);
    }
  };
  
  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Clear the current conversation
  const clearConversation = () => {
    const welcomeMessage: Message = {
      role: "assistant",
      content: "Hello! I'm your FinanceGuru AI advisor. How can I help with your financial questions today?",
      timestamp: new Date().toISOString()
    };
    
    setMessages([welcomeMessage]);
    
    // Update the session
    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? {
            ...session,
            messages: [welcomeMessage],
            lastMessage: welcomeMessage.content,
            timestamp: welcomeMessage.timestamp
          }
        : session
    ));
  };
  
  // Set a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    
    // Focus the textarea
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Rename session - used in a potential future feature
  const renameSession = (sessionId: string, newTitle: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, title: newTitle }
        : session
    ));
  };
  
  // Filter sessions by search query
  const filteredSessions = sessions.filter(session => 
    searchQuery ? 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );
  
  // Render the sidebar sessions list
  const renderSessionsList = () => {
    if (filteredSessions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
          <XCircle className="h-8 w-8 mb-2" />
          <p>No chats found.</p>
          <Button variant="outline" size="sm" onClick={createNewSession} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Start a new chat
          </Button>
        </div>
      );
    }
    
    return filteredSessions.map(session => (
      <div 
        key={session.id}
        className={`p-3 rounded-lg cursor-pointer transition-all ${
          session.id === activeSessionId 
            ? 'bg-primary/10 border border-primary/20' 
            : 'hover:bg-muted'
        }`}
        onClick={() => setActiveSessionId(session.id)}
      >
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-sm truncate max-w-[80%]">{session.title}</h3>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                >
                  <Trash className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete chat</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <p className="text-xs text-muted-foreground truncate">{session.lastMessage}</p>
        <div className="flex items-center mt-1">
          <div className="text-[10px] text-muted-foreground">
            {new Date(session.timestamp).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    ));
  };
  
  return (
    <TooltipProvider>
      <div className="flex h-[calc(100vh-6rem)] overflow-hidden animate-fade-in border rounded-xl shadow-sm relative bg-background">
        {/* Mobile sidebar overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div 
          className={`
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            ${isSidebarCollapsed ? 'w-16' : 'w-80'}
            flex flex-col border-r fixed inset-y-[calc(6rem+0.5rem)] left-[0.5rem] lg:left-[0.5rem] z-40 
            lg:translate-x-0 lg:relative lg:inset-y-0 lg:z-0
            transition-all duration-300 ease-in-out bg-background rounded-l-xl
          `}
        >
          {/* Sidebar header */}
          <div className="p-4 border-b flex items-center justify-between">
            {!isSidebarCollapsed && (
              <h2 className="font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>Finance AI Advisor</span>
              </h2>
            )}
            
            {isSidebarCollapsed && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarCollapsed(false)}
                className="mx-auto"
              >
                <Brain className="h-5 w-5 text-primary" />
              </Button>
            )}
            
            {!isSidebarCollapsed && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarCollapsed(true)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Sidebar content */}
          {!isSidebarCollapsed && (
            <>
              <div className="flex items-center justify-between p-4">
                <Button variant="default" onClick={createNewSession} className="w-full gap-2">
                  <Plus className="h-4 w-4" /> New Chat
                </Button>
              </div>
              
              <div className="px-4 mb-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1 px-2">
                <div className="space-y-2 p-2">
                  {renderSessionsList()}
                </div>
              </ScrollArea>
              
              <div className="border-t p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Current Model</div>
                  <Badge 
                    variant="outline" 
                    className="font-mono text-xs"
                  >
                    {apiProvider === "openrouter" ? "OpenRouter" : "Local"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground truncate max-w-[180px]">
                    {apiProvider === "local" 
                      ? selectedModel.name 
                      : selectedOpenRouterModel.name}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {isSidebarCollapsed && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={createNewSession}
                className="h-10 w-10"
              >
                <Plus className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSettingsOpen(true)}
                className="h-10 w-10"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'} transition-all duration-300 ease-in-out`}>
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden mr-2" 
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              >
                <Bot className="h-5 w-5" />
              </Button>
              
              <h1 className="text-xl font-semibold">AI Financial Advisor</h1>
              
              <div className="flex items-center ml-4">
                <Badge variant="outline" className="ml-2 font-mono text-xs">
                  {apiProvider === "local" ? selectedModel.name : selectedOpenRouterModel.name}
                </Badge>
                
                {apiProvider === "openrouter" && (
                  <Badge variant="secondary" className="ml-2">
                    OpenRouter
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearConversation}
                className="hidden md:flex items-center gap-1"
              >
                <Trash className="h-4 w-4" />
                <span>Clear</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="md:hidden"
                onClick={clearConversation}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat content */}
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-hidden flex flex-col">
              <Tabs 
                defaultValue="chat" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="border-b px-4">
                  <TabsList className="w-full justify-start bg-transparent">
                    <TabsTrigger value="chat" className="relative">
                      Chat
                      <div className={`absolute -bottom-[1px] left-0 right-0 h-[2px] ${activeTab === 'chat' ? 'bg-primary' : 'bg-transparent'} rounded-full transition-all`}></div>
                    </TabsTrigger>
                    <TabsTrigger value="explore" className="relative">
                      Explore
                      <div className={`absolute -bottom-[1px] left-0 right-0 h-[2px] ${activeTab === 'explore' ? 'bg-primary' : 'bg-transparent'} rounded-full transition-all`}></div>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden p-0 m-0">
                  {/* Messages area */}
                  <ScrollArea className="flex-1 p-4">
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={index}
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                      />
                    ))}
                    
                    {isSending && (
                      <div className="flex gap-4 my-6 max-w-4xl mx-auto animate-pulse">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="rounded-xl p-4 max-w-[80%] bg-muted">
                          <div className="flex space-x-3 items-center h-6">
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                  
                  {/* Input area */}
                  <div className="border-t p-4">
                    <div className="flex flex-col gap-4 mx-auto max-w-4xl">
                      <div className="relative">
                        <Textarea
                          ref={inputRef}
                          placeholder="Ask your financial question..."
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="min-h-[80px] resize-none rounded-xl pr-12 shadow-sm border-muted"
                        />
                        <Button 
                          onClick={handleSendMessage}
                          size="icon" 
                          className="absolute right-3 bottom-3 h-9 w-9 rounded-full"
                          disabled={isSending || !inputMessage.trim()}
                        >
                          {isSending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <SendHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          <span>AI advisors can make mistakes. Consider checking important information.</span>
                        </div>
                        
                        {apiProvider === "openrouter" && (
                          <div className="flex items-center gap-1">
                            <span>Using:</span>
                            <span className="font-medium">{selectedOpenRouterModel.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="explore" className="flex-1 overflow-hidden p-0 m-0">
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b">
                      <h2 className="text-xl font-semibold mb-2">Explore Financial Topics</h2>
                      <p className="text-sm text-muted-foreground">
                        Discover key financial concepts and get answers to common questions.
                      </p>
                    </div>
                    
                    <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                      <div className="md:w-64 border-r md:flex md:flex-col p-4 hidden">
                        <h3 className="font-medium mb-3">Categories</h3>
                        <div className="space-y-1">
                          {Object.keys(suggestedQuestions).map((category) => (
                            <button
                              key={category}
                              className={`text-sm w-full p-2 rounded-md flex items-center justify-between ${
                                activeQuestionCategory === category 
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => setActiveQuestionCategory(category)}
                            >
                              <div className="flex items-center gap-2">
                                {category === 'basics' && <BookOpenText className="h-4 w-4" />}
                                {category === 'investing' && <BarChartBig className="h-4 w-4" />}
                                {category === 'planning' && <BanknoteIcon className="h-4 w-4" />}
                                {category === 'taxes' && <FileText className="h-4 w-4" />}
                                <span className="capitalize">{category}</span>
                              </div>
                              {activeQuestionCategory === category && (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <ScrollArea className="flex-1 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Category select for mobile */}
                          <div className="md:hidden col-span-full mb-4">
                            <label className="text-sm font-medium mb-2 block">Select Category</label>
                            <select 
                              className="w-full p-2 border rounded-md"
                              value={activeQuestionCategory}
                              onChange={(e) => setActiveQuestionCategory(e.target.value)}
                            >
                              {Object.keys(suggestedQuestions).map((category) => (
                                <option key={category} value={category}>
                                  {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <Card className="col-span-full mb-6">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                  {activeQuestionCategory === 'basics' && <BookOpenText className="h-5 w-5 text-primary" />}
                                  {activeQuestionCategory === 'investing' && <BarChartBig className="h-5 w-5 text-primary" />}
                                  {activeQuestionCategory === 'planning' && <BanknoteIcon className="h-5 w-5 text-primary" />}
                                  {activeQuestionCategory === 'taxes' && <FileText className="h-5 w-5 text-primary" />}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold capitalize">{activeQuestionCategory} Fundamentals</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {activeQuestionCategory === 'basics' && "Master the essential financial concepts that form the foundation of smart money management."}
                                    {activeQuestionCategory === 'investing' && "Learn how to grow your wealth through strategic investment approaches and techniques."}
                                    {activeQuestionCategory === 'planning' && "Develop structured approaches to achieve your financial goals and prepare for the future."}
                                    {activeQuestionCategory === 'taxes' && "Understand tax strategies to legally minimize your tax burden and maximize your financial efficiency."}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {suggestedQuestions[activeQuestionCategory as keyof typeof suggestedQuestions].map((question, index) => (
                            <Card key={index} className="overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
                              <CardContent className="p-0">
                                <button 
                                  className="p-6 text-left w-full h-full flex flex-col"
                                  onClick={() => {
                                    handleSuggestedQuestion(question);
                                    setActiveTab("chat");
                                  }}
                                >
                                  <div className="mb-auto">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="bg-primary/10 p-2 rounded-full">
                                        <Lightbulb className="h-4 w-4 text-primary" />
                                      </div>
                                      <Badge variant="outline" className="text-xs">Question {index + 1}</Badge>
                                    </div>
                                    <h3 className="font-medium text-md mt-2">{question}</h3>
                                  </div>
                                  
                                  <div className="mt-4 flex items-center justify-between pt-4 border-t text-sm">
                                    <span className="text-muted-foreground">Click to ask</span>
                                    <ArrowRightCircle className="h-4 w-4 text-primary" />
                                  </div>
                                </button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        <div className="mt-10 mb-6">
                          <h3 className="text-lg font-semibold mb-4">Popular Resources</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                  <Sparkles className="h-5 w-5 text-primary" />
                                  <h4 className="font-medium">Investing Basics</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Learn the fundamentals of investing for beginners.</p>
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto text-primary" 
                                  onClick={() => handleSuggestedQuestion("Explain investing basics for beginners")}
                                >
                                  Explore <MoveRight className="h-3 w-3 ml-1" />
                                </Button>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                  <Clock className="h-5 w-5 text-primary" />
                                  <h4 className="font-medium">Retirement Planning</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Plan effectively for a secure retirement future.</p>
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto text-primary" 
                                  onClick={() => handleSuggestedQuestion("How should I plan for retirement?")}
                                >
                                  Explore <MoveRight className="h-3 w-3 ml-1" />
                                </Button>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                  <Rabbit className="h-5 w-5 text-primary" />
                                  <h4 className="font-medium">Debt Strategies</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Effective methods to manage and reduce debt faster.</p>
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto text-primary" 
                                  onClick={() => handleSuggestedQuestion("What's the best strategy to pay off debt?")}
                                >
                                  Explore <MoveRight className="h-3 w-3 ml-1" />
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              AI Model Settings
            </DialogTitle>
            <DialogDescription>
              Configure your AI financial advisor preferences and models
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
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${apiProvider === 'local' ? 'border-primary ring-1 ring-primary/20' : ''}`}
                    onClick={() => setAPIProvider('local')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <Bot className="h-4 w-4 text-primary" />
                        Local AI
                      </h3>
                      {apiProvider === 'local' && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Basic AI responses with no API key required
                    </p>
                  </Card>
                  
                  <Card 
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${apiProvider === 'openrouter' ? 'border-primary ring-1 ring-primary/20' : ''}`}
                    onClick={() => setAPIProvider('openrouter')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        OpenRouter
                      </h3>
                      {apiProvider === 'openrouter' ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <Badge variant="outline" className="text-xs">Advanced</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Access to multiple advanced AI models with API key
                    </p>
                  </Card>
                </div>
                
                {apiProvider === "openrouter" && (
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
              {apiProvider === "local" ? (
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
    </TooltipProvider>
  );
};

export default AdvisorChat;
