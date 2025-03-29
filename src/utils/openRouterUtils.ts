
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
    featured: true
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
    featured: true
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
    featured: true
  },
  {
    id: "mistralai/mistral-large",
    name: "Mistral Large",
    description: "Powerful language model with strong reasoning",
    context_length: 32768,
    pricing: {
      prompt: "$2.00/1M tokens",
      completion: "$6.00/1M tokens"
    }
  },
  {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Llama 3 70B",
    description: "Meta's latest large language model",
    context_length: 8192,
    pricing: {
      prompt: "$0.90/1M tokens",
      completion: "$2.70/1M tokens"
    }
  }
];

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
    return data.data.map((model: any) => ({
      id: model.id,
      name: model.name,
      description: model.description || `${model.name} model`,
      context_length: model.context_length || 4096,
      pricing: {
        prompt: model.pricing?.prompt || "Variable",
        completion: model.pricing?.completion || "Variable"
      },
      featured: model.featured || false
    }));
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
