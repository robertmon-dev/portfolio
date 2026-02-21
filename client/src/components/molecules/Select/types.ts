import { ReactNode } from "react";

export type SelectVariant = 'default' | 'header' | 'footer';

export interface SelectProps {
  label?: string;
  error?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: SelectVariant;
}
