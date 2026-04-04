import type { ReactNode } from "react";

export type ArrowVariant = "info" | "start" | "stop" | "down" | "up";

export interface ArrowProps {
  variant?: ArrowVariant;
  title: string;
  children?: ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
}
