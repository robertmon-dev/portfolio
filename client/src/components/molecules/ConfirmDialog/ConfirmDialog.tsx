import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { AlertCircle, Info, RotateCcw } from "lucide-react";
import type { ConfirmDialogProps } from "./types";
import "./ConfirmDialog.scss";

export const ConfirmDialog = ({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isLoading,
  variant = "primary",
}: ConfirmDialogProps) => {
  const { t } = useTranslation();

  const Icon = useMemo(() => {
    switch (variant) {
      case "danger":
        return (
          <AlertCircle size={48} className="confirm-dialog__icon--danger" />
        );
      case "success":
        return (
          <RotateCcw size={48} className="confirm-dialog__icon--success" />
        );
      default:
        return <Info size={48} className="confirm-dialog__icon--primary" />;
    }
  }, [variant]);

  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog__header">{Icon}</div>

      <p className="confirm-dialog__message">{message}</p>

      <div className="confirm-dialog__actions">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
          fullWidth
        >
          {cancelText || t("common.cancel", "Cancel")}
        </Button>
        <Button
          variant={variant}
          onClick={onConfirm}
          isLoading={isLoading}
          fullWidth
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};
