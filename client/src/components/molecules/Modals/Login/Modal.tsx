import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import {
  STEP_COMPONENTS,
  getStepTitleKey,
  STEP_TITLE_FALLBACKS
} from "./ModalContent";
import type { LoginModalProps } from "./types";

export const LoginModal = ({ open, onClose, form, isLoading, step }: LoginModalProps) => {
  const { t } = useTranslation();
  const ActiveStepForm = STEP_COMPONENTS[step];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(getStepTitleKey(step), STEP_TITLE_FALLBACKS[step])}
      size="default"
    >
      {ActiveStepForm && <ActiveStepForm form={form} isLoading={isLoading} />}
    </Modal>
  );
};
