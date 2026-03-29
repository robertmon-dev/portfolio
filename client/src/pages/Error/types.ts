import type { LucideIcon } from "lucide-react";

export type ErrorCode = "404" | "403" | "500" | "offline";

export interface ErrorConfigValue {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export type ErrorConfig = Partial<Record<ErrorCode, ErrorConfigValue>>;

export interface ErrorPageProps {
  code?: ErrorCode;
  title?: string;
  message?: string;
  className?: string;
}
