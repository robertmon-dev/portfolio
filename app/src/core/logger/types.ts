export type LogMeta = Record<string, unknown>;

export interface Logging {
  info(msg: string, meta?: object): void;
  warn(msg: string, meta?: object): void;
  debug(msg: string, meta?: object): void;
  error(msg: string, error?: unknown, meta?: object): void;
}
