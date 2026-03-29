export interface Limiting {
  checkLimit(key: string): Promise<void>;
}
