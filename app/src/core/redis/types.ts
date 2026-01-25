import { ConnectionOptions } from "tls";

export interface RedisOptions {
  url: string;
  tlsEnabled: boolean;
  maxRetries?: number;
  connectTimeout?: number;
  tlsOptions?: ConnectionOptions;
}
