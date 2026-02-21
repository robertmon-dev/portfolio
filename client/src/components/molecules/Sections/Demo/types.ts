import type { ReactNode } from "react";

export interface DemoSectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  columns?: 1 | 2;
}
