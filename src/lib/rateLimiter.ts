// Simple rate limiter to prevent excessive API calls
class RateLimiter {
  private static instance: RateLimiter;
  private lastCallTime: number = 0;
  private minInterval: number = 1000; // Minimum 1 second between calls

  private constructor() {}

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  async waitForNextCall(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;
    
    if (timeSinceLastCall < this.minInterval) {
      const waitTime = this.minInterval - timeSinceLastCall;
      console.log(`Rate limiter: waiting ${waitTime}ms before next call`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastCallTime = Date.now();
  }
}

export default RateLimiter.getInstance();