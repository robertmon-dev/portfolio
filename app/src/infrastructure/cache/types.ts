export interface Caching {
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  del(key: string): Promise<void>;
  wrap<T>(key: string, ttl: number, fetcher: () => Promise<T>): Promise<T>;
}
