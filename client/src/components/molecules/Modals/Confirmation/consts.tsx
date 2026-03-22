import { AlertTriangle, Info, CheckCircle, Trash2 } from "lucide-react";
import type { ButtonVariant } from "@/components/atoms/Button/Button";
import type { ConfirmationModalVariant } from "./types";

export const CONFIRMATION_ICONS: Record<
  ConfirmationModalVariant,
  React.ReactNode
> = {
  danger: <Trash2 size={28} />,
  warning: <AlertTriangle size={28} />,
  info: <Info size={28} />,
  success: <CheckCircle size={28} />,
};

export const CONFIRMATION_BUTTON_VARIANTS: Record<
  ConfirmationModalVariant,
  ButtonVariant
> = {
  danger: "danger",
  warning: "secondary",
  success: "success",
  info: "primary",
};
