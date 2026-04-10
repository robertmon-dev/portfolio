export interface Limiting {
  checkLimit(key: string): Promise<void>;
}

export type RateLimitProfile = "default" | "strict";
