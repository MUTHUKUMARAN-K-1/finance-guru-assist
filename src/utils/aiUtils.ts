
// Utility functions and data for the AI financial advisor

// Financial knowledge database - organized by topics
export const financialKnowledgeBase = {
  budgeting: {
    basics: `Budgeting is the foundation of financial health. To create an effective budget:
1. Calculate your total monthly income (after tax)
2. List all fixed expenses (rent/mortgage, utilities, insurance, etc.)
3. Allocate money for variable expenses (groceries, entertainment, etc.)
4. Set aside money for savings and debt repayment
5. Track your spending and adjust as needed

The 50/30/20 rule is a popular budgeting framework:
- 50% for needs (housing, food, transportation, etc.)
- 30% for wants (entertainment, dining out, etc.)
- 20% for savings and debt repayment`,
    
    tips: `• Use budgeting apps to automate tracking
• Review your budget monthly and adjust as needed
• Use cash envelopes for categories where you tend to overspend
• Include irregular expenses (car maintenance, gifts, etc.)
• Build in small rewards to stay motivated
• Consider a zero-based budget where every dollar has a purpose
• Look for expense categories to reduce (subscriptions, dining out)`,
    
    mistakes: `Common budgeting mistakes include:
- Not tracking small expenses (they add up quickly)
- Creating an overly restrictive budget (it won't be sustainable)
- Not planning for irregular expenses
- Not adjusting the budget as circumstances change
- Forgetting to include savings as a priority expense
- Not having an emergency fund category
- Using credit cards to cover budget shortfalls`,
  },
  
  investing: {
    basics: `Investing is putting money to work with the expectation of growth over time. Key investment principles:

1. Start early: Time in the market is typically more important than timing the market
2. Diversify: Spread investments across different asset classes to reduce risk
3. Consider your time horizon: Longer time horizons can typically withstand more risk
4. Understand risk tolerance: Your ability (financially and emotionally) to endure market fluctuations
5. Mind the fees: Investment fees can significantly impact returns over time

Common investment options:
- Index funds: Low-cost funds that track market indices
- ETFs: Similar to index funds but trade like stocks
- Individual stocks: Higher risk but potential for higher returns
- Bonds: Generally lower risk, lower return investments
- Real estate: Property investments (direct ownership or REITs)
- Retirement accounts: 401(k)s, IRAs with tax advantages`,
    
    strategies: `• Dollar-cost averaging: Investing fixed amounts regularly regardless of market conditions
• Value investing: Seeking undervalued assets
• Growth investing: Focusing on companies with high growth potential
• Income investing: Prioritizing investments that generate regular income
• Buy and hold: Long-term investment strategy with minimal trading
• Three-fund portfolio: Simple approach using total US stock market, international stock, and bond index funds
• Target-date funds: Automatically adjusts risk based on retirement timeline`,
    
    risks: `Investment risks to be aware of:
- Market risk: Overall market declines affecting investments
- Inflation risk: Investment returns not keeping pace with inflation
- Liquidity risk: Difficulty converting investments to cash
- Concentration risk: Too much exposure to a single investment
- Interest rate risk: Changes in interest rates affecting investment values
- Credit risk: Possibility of default on debt investments
- Sequence of returns risk: Order of investment returns impacting long-term performance`,
  },
  
  retirement: {
    basics: `Retirement planning involves building sufficient assets to maintain your lifestyle after you stop working. Key components:

1. Estimate retirement needs (typically 70-85% of pre-retirement income)
2. Utilize tax-advantaged accounts (401(k)s, IRAs)
3. Take advantage of employer matches (free money)
4. Consider healthcare costs (Medicare doesn't cover everything)
5. Plan for longevity (people are living longer)
6. Consider Social Security strategy (when to claim)
7. Create a withdrawal strategy for retirement assets`,
    
    accounts: `Common retirement accounts:
• Traditional 401(k): Pre-tax contributions, tax-deferred growth, taxed withdrawals
• Roth 401(k): After-tax contributions, tax-free growth and withdrawals
• Traditional IRA: Pre-tax contributions (with income limits), tax-deferred growth
• Roth IRA: After-tax contributions (with income limits), tax-free growth and withdrawals
• SEP IRA: For self-employed individuals
• Solo 401(k): For self-employed individuals with no employees
• Health Savings Account (HSA): Triple tax advantage for healthcare expenses`,
    
    withdrawal: `Retirement withdrawal strategies:
- 4% rule: Withdraw 4% of portfolio in first year, adjust for inflation after
- Bucket strategy: Divide assets into short-term, medium-term, and long-term buckets
- Required Minimum Distributions (RMDs): mandatory withdrawals starting at age 73 for most retirement accounts
- Social Security optimization: When to claim to maximize lifetime benefits
- Roth conversion ladder: Converting traditional to Roth accounts strategically
- Tax-efficient withdrawal sequence: Which accounts to tap first`,
  },
  
  debt: {
    management: `Debt management strategies:
- Debt snowball: Pay off smallest debts first (psychological wins)
- Debt avalanche: Pay off highest interest debts first (mathematical optimization)
- Debt consolidation: Combine multiple debts into one with lower interest
- Balance transfers: Move high-interest debt to 0% introductory offers
- Loan refinancing: Get a new loan with better terms
- Debt management plans: Structured repayment plans, often through non-profits
- Income-driven repayment plans: For federal student loans based on income`,
    
    prevention: `Tips to avoid problematic debt:
• Live below your means
• Build an emergency fund to avoid debt for unexpected expenses
• Use credit cards responsibly (pay in full monthly)
• Have clear criteria for "good debt" (appreciating assets, education)
• Understand the true cost of loans (interest, fees, opportunity cost)
• Wait 24-48 hours before making large purchases
• Consider the value of your time when financing purchases`,
    
    prioritization: `How to prioritize debt repayment:
1. Always pay minimums on all debts
2. Build a small emergency fund first (perhaps $1,000)
3. Address high-interest debt (typically credit cards)
4. Consider employer retirement matches before accelerating mortgage/student loan repayment
5. Don't sacrifice retirement savings entirely for low-interest debt
6. Consider financial and psychological factors when choosing between debt payoff and investing`,
  },
  
  emergencyFund: {
    purpose: `An emergency fund is money set aside for unexpected expenses or financial emergencies like:
- Job loss
- Medical expenses
- Car repairs
- Home repairs
- Family emergencies

Having this fund prevents going into debt when unexpected events occur. It provides financial security and peace of mind.`,
    
    size: `The standard recommendation is 3-6 months of essential expenses, but consider:
• Job stability and security
• Income volatility (especially for self-employed)
• Number of income earners in household
• Health and insurance coverage
• Other available assets or credit
• Personal comfort level

Some experts recommend:
- 3 months: Stable job, multiple income sources, strong safety net
- 6 months: Average job stability, single income
- 8-12 months: Self-employed, variable income, weak safety net`,
    
    location: `Where to keep emergency funds:
• High-yield savings accounts (best balance of accessibility and returns)
• Money market accounts (potentially higher interest)
• No-penalty CDs (slightly higher interest but term restrictions)
• Treasury bills (government-backed, higher yields than savings)

Avoid:
- Regular checking accounts (low/no interest)
- Investment accounts (risk of market downturns)
- Long-term CDs (early withdrawal penalties)
- Physical cash (theft risk, no interest)`,
  },
  
  taxes: {
    deductions: `Common tax deductions:
• Standard deduction ($13,850 single, $27,700 married filing jointly for 2023)
• Mortgage interest (for itemizers)
• State and local taxes (SALT, capped at $10,000)
• Charitable contributions
• Medical expenses (exceeding 7.5% of AGI)
• Student loan interest (up to $2,500)
• Self-employment expenses
• Health Savings Account contributions
• Traditional IRA and 401(k) contributions`,
    
    credits: `Tax credits directly reduce tax liability:
• Child Tax Credit (up to $2,000 per qualifying child)
• Child and Dependent Care Credit
• Earned Income Tax Credit (for low to moderate income)
• American Opportunity Credit (education, up to $2,500)
• Lifetime Learning Credit (education, up to $2,000)
• Savers Credit (retirement contributions for lower income)
• Electric Vehicle Tax Credit
• Premium Tax Credit (ACA health insurance subsidies)`,
    
    strategies: `Tax optimization strategies:
• Tax-loss harvesting (selling investments at a loss to offset gains)
• Tax-gain harvesting (selling appreciated assets in low-income years)
• Bunching deductions (consolidating itemized deductions into specific years)
• Qualified charitable distributions from IRAs (for those 70½+)
• Using tax-advantaged accounts strategically
• Timing income and deductions between tax years
• Making business entity choices with tax implications in mind
• Utilizing health savings accounts for triple tax advantages`,
  },
  
  creditScore: {
    factors: `Credit score factors and their approximate weight:
• Payment history (35%): Making payments on time
• Credit utilization (30%): Percentage of available credit being used
• Length of credit history (15%): Age of accounts
• Credit mix (10%): Different types of credit (cards, loans, etc.)
• New credit (10%): Recent applications and new accounts

FICO score ranges:
- Excellent: 800-850
- Very Good: 740-799
- Good: 670-739
- Fair: 580-669
- Poor: 300-579`,
    
    improvement: `Ways to improve credit scores:
• Pay all bills on time (set up automatic payments)
• Reduce credit card balances (aim for <30% utilization)
• Don't close old credit accounts (length of history matters)
• Limit applications for new credit (each hard inquiry impacts score)
• Dispute errors on credit reports
• Become an authorized user on a responsible person's account
• Use a secured credit card if you have limited/bad credit
• Consider credit builder loans
• Request credit limit increases (but don't use the extra credit)`,
    
    myths: `Credit score myths debunked:
• Myth: Checking your own credit hurts your score (it doesn't, only "hard inquiries" do)
• Myth: Closing unused cards helps your score (it can actually hurt by reducing available credit)
• Myth: You need to carry a balance to build credit (paying in full is best)
• Myth: Co-signing doesn't affect your credit (it absolutely does)
• Myth: All credit scores are the same (there are many different scoring models)
• Myth: Higher income means better credit (income isn't directly factored in)
• Myth: Paying off a collection immediately improves your score (impact varies)`,
  },
  
  homebuying: {
    preparation: `Steps to prepare for buying a home:
1. Check your credit score and address issues
2. Determine how much house you can afford (28% of gross income is traditional rule)
3. Save for a down payment (20% avoids PMI, but many programs need less)
4. Get pre-approved for a mortgage
5. Research neighborhoods and housing markets
6. Understand different mortgage options
7. Budget for closing costs (typically 2-5% of loan amount)
8. Consider additional costs (HOA fees, maintenance, property taxes)`,
    
    mortgages: `Common mortgage types:
• Conventional: Not backed by government, typically requires good credit
• FHA: Lower down payment requirements (3.5%), more flexible credit requirements
• VA: For veterans and service members, possible 0% down
• USDA: For rural areas, possible 0% down
• Fixed-rate: Interest rate stays the same for loan term
• Adjustable-rate (ARM): Rate changes after initial fixed period

Loan terms commonly 15, 20, or 30 years. Shorter terms have higher payments but less total interest.`,
    
    costs: `Hidden and ongoing homeownership costs:
• Property taxes
• Homeowners insurance
• Private mortgage insurance (PMI) if down payment <20%
• HOA fees (if applicable)
• Maintenance (typically 1-4% of home value annually)
• Utilities (often higher than in rentals)
• Repairs and replacements (roof, HVAC, appliances)
• Yard care and landscaping
• Pest control
• Furniture and decorating`,
  },
  
  insurance: {
    types: `Essential insurance types:
• Health insurance: Medical expenses coverage
• Auto insurance: Vehicle damage and liability coverage
• Homeowners/renters insurance: Property and liability protection
• Life insurance: Financial protection for dependents
• Disability insurance: Income replacement if unable to work
• Umbrella insurance: Extended liability coverage
• Long-term care insurance: Covers assisted living/nursing home costs`,
    
    life: `Life insurance considerations:
• Term vs. Permanent (whole life, universal life)
• Term: Lower cost, coverage for specific period
• Permanent: Higher cost, builds cash value, lifetime coverage
• Coverage amount typically 10-15x annual income
• Consider future financial obligations (mortgage, education)
• Employer coverage often insufficient
• Health and age impact premiums
• Riders can provide additional benefits`,
    
    health: `Health insurance components:
• Premium: Monthly cost for coverage
• Deductible: Amount you pay before insurance kicks in
• Copay: Fixed amount paid for specific services
• Coinsurance: Percentage of costs you pay after deductible
• Out-of-pocket maximum: Most you'll pay annually
• Network: Providers covered by your plan
• Plan types: HMO, PPO, EPO, HDHP (with HSA eligibility)
• Open enrollment periods vs. qualifying life events`,
  }
};

// Generate a more robust AI response based on user input
export const generateAIResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Check for budget-related queries
  if (input.includes('budget') || input.includes('spending') || input.includes('expense')) {
    if (input.includes('create') || input.includes('start') || input.includes('make')) {
      return `${financialKnowledgeBase.budgeting.basics}\n\nWould you like me to help you set up a personalized budget based on your income and expenses?`;
    }
    if (input.includes('tips') || input.includes('advice') || input.includes('help')) {
      return `${financialKnowledgeBase.budgeting.tips}\n\nDo you have specific budgeting challenges you'd like help with?`;
    }
    if (input.includes('mistake') || input.includes('wrong') || input.includes('error')) {
      return `${financialKnowledgeBase.budgeting.mistakes}\n\nAre you running into any of these issues with your current budgeting approach?`;
    }
    return `Creating and following a budget is essential for financial success. ${financialKnowledgeBase.budgeting.basics.split('\n\n')[0]}\n\nWould you like more specific information about creating a budget, tracking expenses, or optimizing your current budget?`;
  }
  
  // Check for investment-related queries
  if (input.includes('invest') || input.includes('stock') || input.includes('etf') || input.includes('fund')) {
    if (input.includes('begin') || input.includes('start') || input.includes('new')) {
      return `${financialKnowledgeBase.investing.basics}\n\nFor beginners, I typically recommend starting with low-cost index funds that provide broad market exposure. Would you like more information about specific beginner-friendly investment options?`;
    }
    if (input.includes('strategy') || input.includes('approach') || input.includes('plan')) {
      return `${financialKnowledgeBase.investing.strategies}\n\nYour optimal investment strategy depends on your goals, timeline, and risk tolerance. Would you like to discuss which approach might be best for your specific situation?`;
    }
    if (input.includes('risk') || input.includes('danger') || input.includes('lose')) {
      return `${financialKnowledgeBase.investing.risks}\n\nUnderstanding these risks is crucial for making informed investment decisions. How would you describe your risk tolerance?`;
    }
    return `Investment strategies should be tailored to your goals, timeline, and risk tolerance.\n\n${financialKnowledgeBase.investing.basics.split('\n\n')[0]}\n\nWould you like more specific information about investment options, strategies, or risk management?`;
  }
  
  // Check for debt-related queries
  if (input.includes('debt') || input.includes('loan') || input.includes('credit card') || input.includes('mortgage') || input.includes('owe')) {
    if (input.includes('payoff') || input.includes('pay off') || input.includes('reduce')) {
      return `${financialKnowledgeBase.debt.management}\n\nThe two most popular debt reduction strategies are the snowball method (paying smallest debts first) and the avalanche method (paying highest-interest debts first). The snowball method provides psychological wins, while the avalanche method saves more money mathematically. Which approach sounds more appealing to you?`;
    }
    if (input.includes('avoid') || input.includes('prevent') || input.includes('stay out')) {
      return `${financialKnowledgeBase.debt.prevention}\n\nIs there a specific type of debt you're concerned about accumulating?`;
    }
    if (input.includes('which') || input.includes('prioritize') || input.includes('first')) {
      return `${financialKnowledgeBase.debt.prioritization}\n\nCan you share what types of debt you currently have and their interest rates? This will help me provide more tailored advice.`;
    }
    return `When dealing with debt, having a strategic approach can save you money and reduce financial stress.\n\n${financialKnowledgeBase.debt.management.split('\n')[0]}\n\nWould you like to discuss specific strategies for your debt situation?`;
  }
  
  // Check for emergency fund queries
  if (input.includes('emergency') || input.includes('rainy day') || input.includes('emergency fund') || input.includes('savings')) {
    if (input.includes('why') || input.includes('reason') || input.includes('purpose')) {
      return `${financialKnowledgeBase.emergencyFund.purpose}\n\nDo you currently have emergency savings in place?`;
    }
    if (input.includes('how much') || input.includes('size') || input.includes('enough')) {
      return `${financialKnowledgeBase.emergencyFund.size}\n\nConsidering your personal situation, would you like help calculating your ideal emergency fund target?`;
    }
    if (input.includes('where') || input.includes('keep') || input.includes('store')) {
      return `${financialKnowledgeBase.emergencyFund.location}\n\nThe key is balancing accessibility with some growth to offset inflation. Have you considered where to keep your emergency fund?`;
    }
    return `Building an emergency fund should be a top financial priority.\n\n${financialKnowledgeBase.emergencyFund.purpose}\n\n${financialKnowledgeBase.emergencyFund.size.split('\n\n')[0]}\n\nWould you like help determining your emergency fund target amount?`;
  }
  
  // Check for retirement planning queries
  if (input.includes('retire') || input.includes('401k') || input.includes('ira') || input.includes('pension')) {
    if (input.includes('start') || input.includes('begin') || input.includes('early')) {
      return `${financialKnowledgeBase.retirement.basics}\n\nThe earlier you start saving for retirement, the more you benefit from compound growth. Would you like to discuss retirement account options that might be suitable for your situation?`;
    }
    if (input.includes('account') || input.includes('vehicle') || input.includes('where')) {
      return `${financialKnowledgeBase.retirement.accounts}\n\nEach account type has different tax advantages and rules. Based on your employment situation, which of these options are available to you?`;
    }
    if (input.includes('withdraw') || input.includes('take out') || input.includes('distribution')) {
      return `${financialKnowledgeBase.retirement.withdrawal}\n\nPlanning your retirement withdrawals properly can help optimize tax efficiency and make your money last longer. Are you currently in the accumulation or distribution phase?`;
    }
    return `Retirement planning is about balancing current needs with future security.\n\n${financialKnowledgeBase.retirement.basics}\n\nI generally recommend contributing at least enough to get any employer match on retirement accounts, then working toward maxing out tax-advantaged accounts. Would you like to discuss retirement planning strategies in more detail?`;
  }
  
  // Check for credit score queries
  if (input.includes('credit score') || input.includes('fico') || input.includes('credit report')) {
    if (input.includes('improve') || input.includes('increase') || input.includes('raise')) {
      return `${financialKnowledgeBase.creditScore.improvement}\n\nDo you know your current credit score and which factors might be bringing it down?`;
    }
    if (input.includes('factor') || input.includes('affect') || input.includes('impact')) {
      return `${financialKnowledgeBase.creditScore.factors}\n\nUnderstanding these factors can help you make strategic decisions to improve your score. Which area do you think needs the most work for your credit profile?`;
    }
    if (input.includes('myth') || input.includes('true') || input.includes('false')) {
      return `${financialKnowledgeBase.creditScore.myths}\n\nHave you heard other credit score claims that you're unsure about?`;
    }
    return `Your credit score plays a crucial role in your financial life, affecting loan approvals, interest rates, and even some employment opportunities.\n\n${financialKnowledgeBase.creditScore.factors}\n\nWould you like information about checking your credit score or specific strategies to improve it?`;
  }
  
  // Check for homebuying queries
  if (input.includes('house') || input.includes('home') || input.includes('mortgage') || input.includes('property')) {
    if (input.includes('prepare') || input.includes('ready') || input.includes('before')) {
      return `${financialKnowledgeBase.homebuying.preparation}\n\nWhere are you in the home buying preparation process?`;
    }
    if (input.includes('mortgage') || input.includes('loan') || input.includes('finance')) {
      return `${financialKnowledgeBase.homebuying.mortgages}\n\nUnderstanding these options will help you choose the mortgage that best fits your situation. Would you like to discuss specific mortgage types in more detail?`;
    }
    if (input.includes('cost') || input.includes('expense') || input.includes('afford')) {
      return `${financialKnowledgeBase.homebuying.costs}\n\nMany first-time homebuyers underestimate these ongoing costs. Have you factored these expenses into your homebuying budget?`;
    }
    return `Buying a home is likely the largest financial transaction of your life. Proper preparation is essential.\n\n${financialKnowledgeBase.homebuying.preparation.split('\n')[0]}\n\nWhat stage of the homebuying process are you in?`;
  }
  
  // Check for tax queries
  if (input.includes('tax') || input.includes('deduction') || input.includes('credit') || input.includes('irs')) {
    if (input.includes('deduction') || input.includes('write off')) {
      return `${financialKnowledgeBase.taxes.deductions}\n\nDeductions reduce your taxable income, while credits directly reduce your tax liability. Are there specific deductions you're wondering if you qualify for?`;
    }
    if (input.includes('credit')) {
      return `${financialKnowledgeBase.taxes.credits}\n\nTax credits are particularly valuable as they directly reduce your tax bill. Based on your situation, are there specific credits you're interested in learning more about?`;
    }
    if (input.includes('strategy') || input.includes('save') || input.includes('reduce')) {
      return `${financialKnowledgeBase.taxes.strategies}\n\nStrategic tax planning can significantly impact your overall financial picture. Would you like to discuss specific strategies that might apply to your situation?`;
    }
    return `Tax planning is an important part of overall financial management. Understanding available deductions and credits can help minimize your tax burden.\n\n${financialKnowledgeBase.taxes.deductions.split('\n\n')[0]}\n\nDo you have specific tax questions related to your financial situation?`;
  }
  
  // Check for insurance queries
  if (input.includes('insurance') || input.includes('coverage') || input.includes('policy')) {
    if (input.includes('type') || input.includes('need') || input.includes('what')) {
      return `${financialKnowledgeBase.insurance.types}\n\nEach type of insurance addresses different risks. Which specific types of insurance are you considering or curious about?`;
    }
    if (input.includes('life') || input.includes('death')) {
      return `${financialKnowledgeBase.insurance.life}\n\nLife insurance needs change throughout your life. Do you have dependents who rely on your income?`;
    }
    if (input.includes('health') || input.includes('medical')) {
      return `${financialKnowledgeBase.insurance.health}\n\nChoosing the right health insurance plan depends on your health needs, budget, and risk tolerance. Would you like to discuss how to evaluate health insurance options?`;
    }
    return `Insurance is a crucial part of financial planning, protecting you from catastrophic expenses.\n\n${financialKnowledgeBase.insurance.types}\n\nWhich types of insurance are you most interested in learning more about?`;
  }
  
  // Generic financial advice for other queries
  return `That's a great financial question. Based on general financial principles, I'd suggest considering the following:

1. Assess your current financial situation (income, expenses, assets, debts)
2. Define clear financial goals (short-term, medium-term, long-term)
3. Create a realistic budget that supports those goals
4. Build emergency savings for unexpected expenses
5. Pay down high-interest debt
6. Invest for long-term goals like retirement
7. Ensure adequate insurance coverage
8. Regularly review and adjust your financial plan

To give you more specific advice, could you provide more details about your particular financial situation and goals?`;
};
