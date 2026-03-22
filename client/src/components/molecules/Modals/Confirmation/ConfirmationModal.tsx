import Modal from "../Modal";
import { Button } from "@/components/atoms/Button/Button";
import { CONFIRMATION_ICONS, CONFIRMATION_BUTTON_VARIANTS } from "./consts";
import type { ConfirmationModalProps } from "./types";
import { useTranslation } from "react-i18next";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  variant = "danger",
  isLoading,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={isOpen} title={title} onClose={onClose} size="default">
      <div className={`confirmation-modal confirmation-modal--${variant}`}>
        <div className="confirmation-modal__icon">
          {CONFIRMATION_ICONS[variant]}
        </div>

        <p className="confirmation-modal__message">{message}</p>

        <div className="confirmation-modal__actions">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t("common.cancel")}
          </Button>

          <Button
            variant={CONFIRMATION_BUTTON_VARIANTS[variant]}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {t("common.confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
