
// Mock user profile data
export const userProfile = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "January 2023",
  profileComplete: 85,
};

// Mock financial overview data
export const financialOverview = {
  totalAssets: 87500,
  totalDebts: 45000,
  netWorth: 42500,
  monthlyIncome: 6800,
  monthlyExpenses: 5100,
  savingsRate: 25, // percentage
};

// Mock budget data
export const budgetCategories = [
  { name: "Housing", allocated: 2000, spent: 1950, percentage: 38 },
  { name: "Food", allocated: 800, spent: 920, percentage: 16 },
  { name: "Transportation", allocated: 400, spent: 380, percentage: 8 },
  { name: "Utilities", allocated: 300, spent: 290, percentage: 6 },
  { name: "Entertainment", allocated: 400, spent: 510, percentage: 8 },
  { name: "Healthcare", allocated: 200, spent: 120, percentage: 4 },
  { name: "Shopping", allocated: 300, spent: 410, percentage: 6 },
  { name: "Savings", allocated: 1300, spent: 1300, percentage: 26 },
  { name: "Other", allocated: 100, spent: 80, percentage: 2 },
];

// Monthly expenses data for charts
export const monthlyExpenses = [
  { month: "Jan", amount: 4950 },
  { month: "Feb", amount: 5150 },
  { month: "Mar", amount: 4800 },
  { month: "Apr", amount: 5050 },
  { month: "May", amount: 5200 },
  { month: "Jun", amount: 5100 },
];

// Monthly income data for charts
export const monthlyIncome = [
  { month: "Jan", amount: 6500 },
  { month: "Feb", amount: 6650 },
  { month: "Mar", amount: 6800 },
  { month: "Apr", amount: 6800 },
  { month: "May", amount: 6800 },
  { month: "Jun", amount: 6800 },
];

// Mock investment data
export const investmentAccounts = [
  { 
    name: "401(k)", 
    balance: 38000, 
    allocation: { stocks: 70, bonds: 25, cash: 5 },
    performance: { yearly: 7.2, allTime: 22.5 }
  },
  { 
    name: "Roth IRA", 
    balance: 21500, 
    allocation: { stocks: 85, bonds: 10, cash: 5 },
    performance: { yearly: 8.4, allTime: 18.2 }
  },
  { 
    name: "Brokerage", 
    balance: 15800, 
    allocation: { stocks: 90, bonds: 0, cash: 10 },
    performance: { yearly: 5.8, allTime: 14.3 }
  },
];

// Investment growth simulation data
export const investmentGrowthData = [
  { year: 0, value: 10000 },
  { year: 5, value: 14000 },
  { year: 10, value: 20000 },
  { year: 15, value: 28000 },
  { year: 20, value: 40000 },
  { year: 25, value: 55000 },
  { year: 30, value: 76000 },
];

// Mock financial goals
export const financialGoals = [
  { 
    name: "Emergency Fund", 
    category: "savings",
    current: 12000, 
    target: 15000, 
    deadline: "September 2023",
    progress: 80 
  },
  { 
    name: "House Down Payment", 
    category: "property",
    current: 45000, 
    target: 80000, 
    deadline: "December 2025",
    progress: 56 
  },
  { 
    name: "Car Loan Payoff", 
    category: "debt",
    current: 8000, 
    target: 15000, 
    deadline: "June 2024",
    progress: 53 
  },
  { 
    name: "Vacation Fund", 
    category: "leisure",
    current: 1500, 
    target: 5000, 
    deadline: "July 2024",
    progress: 30 
  },
];

// Mock stock data
export const stockWatchlist = [
  { 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    price: 182.25, 
    change: 2.34, 
    changePercent: 1.28 
  },
  { 
    symbol: "MSFT", 
    name: "Microsoft Corporation", 
    price: 338.11, 
    change: -1.45, 
    changePercent: -0.43 
  },
  { 
    symbol: "GOOGL", 
    name: "Alphabet Inc.", 
    price: 142.65, 
    change: 0.87, 
    changePercent: 0.61 
  },
  { 
    symbol: "AMZN", 
    name: "Amazon.com, Inc.", 
    price: 175.35, 
    change: 3.28, 
    changePercent: 1.91 
  },
  { 
    symbol: "TSLA", 
    name: "Tesla, Inc.", 
    price: 178.82, 
    change: -4.23, 
    changePercent: -2.31 
  },
];

// Educational content
export const educationalResources = {
  tutorials: [
    { 
      title: "Budgeting Fundamentals", 
      description: "Learn the basics of creating and sticking to a budget",
      difficulty: "Beginner",
      duration: "15 min"
    },
    { 
      title: "Investing Basics", 
      description: "Understanding different investment types and strategies",
      difficulty: "Beginner",
      duration: "25 min"
    },
    { 
      title: "Retirement Planning", 
      description: "Setting yourself up for a comfortable retirement",
      difficulty: "Intermediate",
      duration: "20 min"
    },
    { 
      title: "Debt Reduction Strategies", 
      description: "Methods to efficiently pay down debt and save on interest",
      difficulty: "Beginner",
      duration: "15 min"
    },
    { 
      title: "Understanding Credit Scores", 
      description: "How credit scores work and ways to improve yours",
      difficulty: "Beginner",
      duration: "10 min"
    },
  ],
  glossaryTerms: [
    {
      term: "Compound Interest",
      definition: "Interest calculated on the initial principal and also on the accumulated interest from previous periods",
      category: "investing"
    },
    {
      term: "401(k)",
      definition: "A tax-advantaged retirement account sponsored by employers",
      category: "retirement"
    },
    {
      term: "Emergency Fund",
      definition: "Money set aside for unexpected expenses or financial emergencies",
      category: "savings"
    },
    {
      term: "Credit Score",
      definition: "A numerical expression based on analysis of a person's credit files, representing their creditworthiness",
      category: "credit"
    },
    {
      term: "Asset Allocation",
      definition: "The strategy of dividing investments among different asset categories like stocks, bonds, and cash",
      category: "investing"
    },
  ],
  caseStudies: [
    {
      title: "The Early Investor",
      description: "Comparison of early vs. late investment starts",
      category: "investing"
    },
    {
      title: "Debt Snowball vs. Avalanche",
      description: "Analysis of different debt repayment strategies",
      category: "debt"
    },
    {
      title: "Buy vs. Rent Housing",
      description: "Long-term financial comparison of buying or renting a home",
      category: "housing"
    },
  ]
};

// Sample AI advisor chat history
export const aiChatHistory = [
  {
    role: "assistant",
    content: "Hello! I'm your FinanceGuru AI advisor. How can I help with your financial questions today?",
    timestamp: "2023-06-01T14:22:00Z"
  },
  {
    role: "user",
    content: "I'm trying to decide whether to pay off my student loans or invest more in my 401(k). What should I consider?",
    timestamp: "2023-06-01T14:23:15Z"
  },
  {
    role: "assistant",
    content: "That's a great question about balancing debt repayment and retirement savings. Here are some factors to consider:\n\n1. Interest rates - Compare your student loan interest rate to your expected investment return. If your loan rate is higher than what you expect to earn investing (after considering any employer match), prioritize the loan.\n\n2. Employer match - If your employer offers a 401(k) match, consider contributing at least enough to get the full match, as this is essentially free money.\n\n3. Tax benefits - Both student loan interest and 401(k) contributions may offer tax benefits depending on your situation.\n\n4. Emergency fund status - Ensure you have adequate emergency savings before accelerating either loan payments or investments.\n\nMany financial advisors recommend a balanced approach: get your employer match, then focus on high-interest debt, while maintaining minimum payments on lower-interest debt.",
    timestamp: "2023-06-01T14:25:43Z"
  }
];

// Available AI models
export const aiModels = [
  { id: "gpt-4", name: "OpenAI GPT-4", type: "premium", description: "Advanced financial analysis and personalized advice" },
  { id: "deepseek", name: "DeepSeek AI", type: "standard", description: "Solid financial guidance with good accuracy" },
  { id: "huggingface", name: "HuggingFace Models", type: "free", description: "Basic financial information and general guidance" },
  { id: "local", name: "Local Engine", type: "offline", description: "Works without internet using pre-defined responses" },
];

// Resource library items
export const resourceLibrary = [
  {
    title: "The Psychology of Money",
    type: "book",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness",
    rating: 4.7,
    link: "#"
  },
  {
    title: "The Bogleheads' Guide to Investing",
    type: "book",
    author: "Taylor Larimore, Mel Lindauer, Michael LeBoeuf",
    description: "Simple investing approach based on index funds",
    rating: 4.8,
    link: "#"
  },
  {
    title: "Khan Academy - Personal Finance",
    type: "course",
    author: "Khan Academy",
    description: "Free comprehensive overview of personal finance topics",
    rating: 4.5,
    link: "#"
  },
  {
    title: "Monthly Budget Template",
    type: "template",
    author: "FinanceGuru",
    description: "Customizable Excel spreadsheet for tracking monthly expenses",
    rating: 4.6,
    link: "#"
  },
  {
    title: "Debt Reduction Calculator",
    type: "tool",
    author: "FinanceGuru",
    description: "Interactive tool to create a debt payoff plan",
    rating: 4.4,
    link: "#"
  },
];
