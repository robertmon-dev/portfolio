import { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  size?: "default" | "40vw" | "60vw" | "90vw" | "95vw";
  role?: "dialog" | "alertdialog";
  ariaDescribedById?: string;
  titleId?: string;
  className?: string;
}
