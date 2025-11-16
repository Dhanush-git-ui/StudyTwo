// API Manager with Rate Limiting and Model Selection
class ApiManager {
  private static instance: ApiManager;
  private rateLimitDelays: Map<string, number> = new Map();
  private lastRequestTime: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  }

  // Get the appropriate model based on the task
  getModelForTask(task: 'quiz' | 'flashcard' | 'summary' | 'test'): string {
    switch (task) {
      case 'quiz':
        return 'gemini-2.5-pro';
      case 'flashcard':
        return 'gemini-2.5-flash';
      case 'summary':
        return 'gemini-2.5-flash-lite';
      case 'test':
        return 'gemini-2.5-flash-lite-preview-09-2025';
      default:
        return 'gemini-2.5-flash';
    }
  }

  // Check if we need to delay the request based on rate limits
  async checkRateLimit(apiKey: string): Promise<void> {
    const now = Date.now();
    const lastRequest = this.lastRequestTime.get(apiKey) || 0;
    const delay = this.rateLimitDelays.get(apiKey) || 0;
    
    // Calculate time to wait if we're too close to the rate limit
    const timeSinceLastRequest = now - lastRequest;
    if (timeSinceLastRequest < delay) {
      const waitTime = delay - timeSinceLastRequest;
      console.log(`Rate limiting: waiting ${waitTime}ms before next request`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  // Update rate limit tracking after a request
  updateRateLimitTracking(apiKey: string, hadRateLimit: boolean = false): void {
    const now = Date.now();
    this.lastRequestTime.set(apiKey, now);
    
    // If we hit a rate limit, increase the delay for future requests
    if (hadRateLimit) {
      const currentDelay = this.rateLimitDelays.get(apiKey) || 1000;
      const newDelay = Math.min(currentDelay * 1.5, 10000); // Max 10 seconds
      this.rateLimitDelays.set(apiKey, newDelay);
      console.log(`Increased rate limit delay to ${newDelay}ms due to rate limiting`);
    } else {
      // Gradually decrease the delay if we're not hitting limits
      const currentDelay = this.rateLimitDelays.get(apiKey) || 1000;
      const newDelay = Math.max(currentDelay * 0.9, 1000); // Min 1 second
      this.rateLimitDelays.set(apiKey, newDelay);
    }
  }

  // Exponential backoff retry mechanism
  async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 5,
    baseDelay: number = 2000
  ): Promise<T> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        const isRateLimit = this.isRateLimitError(error);
        const isLastAttempt = attempt === maxRetries;
        
        if (!isRateLimit || isLastAttempt) {
          throw error;
        }
        
        // Exponential backoff with jitter: 2s, 4s, 8s, 16s, 32s
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
        console.warn(`Rate limited, retrying in ${Math.round(delay)}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Max retries exceeded. Please try again later.');
  }

  // Check if an error is a rate limit error
  private isRateLimitError(error: any): boolean {
    if (!error) return false;
    
    const message = error.message?.toLowerCase() || '';
    const status = error.status || error.statusCode || 0;
    
    return (
      status === 429 ||
      message.includes('429') ||
      message.includes('quota') ||
      message.includes('rate_limit') ||
      message.includes('rate limit') ||
      message.includes('quota exceeded')
    );
  }
}

export default ApiManager.getInstance();