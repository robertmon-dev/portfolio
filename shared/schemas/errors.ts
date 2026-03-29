export const NETWORK_ERROR_MESSAGES = [
  "Failed to fetch",
  "NetworkError when attempting to fetch resource",
  "Load failed",
  "Failed to execute 'fetch' on 'Window'",
  "ERR_CONNECTION_REFUSED",
];

export type ErrorSeverity = "CRITICAL" | "WARNING" | "SILENT";

export interface ParsedError {
  code: string;
  severity: ErrorSeverity;
  translationKey: string;
  isNetworkError: boolean;
}

export const SILENT_TRPC_PATHS = [["account", "me"]] as const;

export const isSilentTRPCPath = (path: unknown): boolean => {
  if (!Array.isArray(path)) return false;

  return SILENT_TRPC_PATHS.some((silentPath) => {
    return (
      silentPath.length === path.length &&
      silentPath.every((segment, index) => segment === path[index])
    );
  });
};
