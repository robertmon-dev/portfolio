import { useTranslation } from "react-i18next";

export const useModalTranslations = () => {
  const { t } = useTranslation();

  return {
    closeAria: t("molecules.modal.base.closeAria", "Close modal"),
  };
};
