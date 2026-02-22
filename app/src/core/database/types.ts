import type { PrismaClient } from "@prisma/client";

export type LogLevel = 'query' | 'error' | 'warn' | 'info';

export interface Persisting {
  readonly client: PrismaClient;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
