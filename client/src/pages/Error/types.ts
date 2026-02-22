import { LucideIcon } from "lucide-react";

export type ErrorCode = '404' | '403' | '500';

export interface ErrorConfigValue {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export type ErrorConfig = Record<ErrorCode, ErrorConfigValue>;

export interface ErrorPageProps {
  code?: ErrorCode;
  title?: string;
  message?: string;
  className?: string;
}
