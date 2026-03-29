export const NETWORK_ERROR_MESSAGES = [
  "Failed to fetch",
  "NetworkError when attempting to fetch resource",
  "Load failed",
  "Failed to execute 'fetch' on 'Window'",
];

export type ErrorSeverity = "CRITICAL" | "WARNING" | "SILENT";

export interface ParsedError {
  code: string;
  severity: ErrorSeverity;
  translationKey: string;
  isNetworkError: boolean;
}
