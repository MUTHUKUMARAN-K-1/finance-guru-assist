
// OpenRouter API integration for accessing multiple AI models

export type OpenRouterModel = {
  id: string;
  name: string;
  description: string;
  context_length: number;
  pricing: {
    prompt: string;
    completion: string;
  };
  featured?: boolean;
  category?: string; // Added field to categorize models
}

export type OpenRouterResponse = {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  model: string;
  created: number;
  object: string;
}

// Default models to display before API fetch
export const defaultOpenRouterModels: OpenRouterModel[] = [
  {
    id: "anthropic/claude-3-opus:beta",
    name: "Claude 3 Opus",
    description: "Most powerful model for complex reasoning",
    context_length: 200000,
    pricing: {
      prompt: "$15.00/1M tokens",
      completion: "$75.00/1M tokens"
    },
    featured: true,
    category: "Anthropic"
  },
  {
    id: "anthropic/claude-3-sonnet:beta",
    name: "Claude 3 Sonnet",
    description: "Excellent balance of intelligence and speed",
    context_length: 200000,
    pricing: {
      prompt: "$3.00/1M tokens",
      completion: "$15.00/1M tokens"
    },
    featured: true,
    category: "Anthropic"
  },
  {
    id: "google/gemini-pro",
    name: "Gemini Pro",
    description: "Google's advanced reasoning model",
    context_length: 32768,
    pricing: {
      prompt: "$0.50/1M tokens",
      completion: "$1.50/1M tokens"
    },
    featured: true,
    category: "Google"
  },
  {
    id: "mistralai/mistral-large",
    name: "Mistral Large",
    description: "Powerful language model with strong reasoning",
    context_length: 32768,
    pricing: {
      prompt: "$2.00/1M tokens",
      completion: "$6.00/1M tokens"
    },
    category: "Mistral"
  },
  {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Llama 3 70B",
    description: "Meta's latest large language model",
    context_length: 8192,
    pricing: {
      prompt: "$0.90/1M tokens",
      completion: "$2.70/1M tokens"
    },
    category: "Meta"
  }
];

// Function to categorize models based on their ID
const categorizeModel = (model: any): string => {
  const id = model.id.toLowerCase();
  if (id.includes('anthropic') || id.includes('claude')) return 'Anthropic';
  if (id.includes('google') || id.includes('gemini')) return 'Google';
  if (id.includes('mistral')) return 'Mistral';
  if (id.includes('meta') || id.includes('llama')) return 'Meta';
  if (id.includes('openai') || id.includes('gpt')) return 'OpenAI';
  if (id.includes('cohere')) return 'Cohere';
  if (id.includes('qwen')) return 'Qwen';
  if (id.includes('deepseek')) return 'DeepSeek';
  if (id.includes('groq')) return 'Groq';
  return 'Other';
};

// Fetch available models from OpenRouter API
export const fetchOpenRouterModels = async (apiKey: string): Promise<OpenRouterModel[]> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the API response to our model format
    const models = data.data.map((model: any) => {
      // Extract pricing information or provide defaults
      const promptPrice = model.pricing?.prompt !== undefined 
        ? parseFloat(model.pricing.prompt) > 0 
          ? `$${(parseFloat(model.pricing.prompt) * 1000000).toFixed(2)}/1M tokens`
          : "Free" 
        : "Variable";
        
      const completionPrice = model.pricing?.completion !== undefined 
        ? parseFloat(model.pricing.completion) > 0 
          ? `$${(parseFloat(model.pricing.completion) * 1000000).toFixed(2)}/1M tokens` 
          : "Free"
        : "Variable";

      return {
        id: model.id,
        name: model.name || model.id.split('/').pop(),
        description: model.description || `${model.name || model.id.split('/').pop()} model`,
        context_length: model.context_length || 4096,
        pricing: {
          prompt: promptPrice,
          completion: completionPrice
        },
        featured: model.featured || false,
        category: categorizeModel(model)
      };
    });

    // Sort models by category and featured status
    return models.sort((a, b) => {
      // First by free/paid status (free first)
      const aFree = a.pricing.prompt === "Free" || a.pricing.completion === "Free";
      const bFree = b.pricing.prompt === "Free" || b.pricing.completion === "Free";
      if (aFree && !bFree) return -1;
      if (!aFree && bFree) return 1;
      
      // Then by featured status
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by category
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      
      // Finally by name
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    // Return default models if the API call fails
    return defaultOpenRouterModels;
  }
};

// Send a message to OpenRouter API
export const sendMessageToOpenRouter = async (
  apiKey: string,
  model: string,
  messages: { role: string, content: string }[],
  systemPrompt: string
): Promise<string> => {
  try {
    // Add system prompt if provided
    const messagePayload = systemPrompt 
      ? [{ role: "system", content: systemPrompt }, ...messages]
      : messages;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin, // Required for OpenRouter
        'X-Title': 'FinanceGuru AI Advisor' // Optional but recommended
      },
      body: JSON.stringify({
        model: model,
        messages: messagePayload,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error sending message to OpenRouter:', error);
    // Fallback to local response generator
    return `I couldn't connect to the OpenRouter API. ${error}. Let me provide a locally generated response instead.`;
  }
};
