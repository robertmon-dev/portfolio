import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import type { ContactFormInput } from "@portfolio/shared";
import type { ContactMutations } from "./useContactMutations";

export const useContactActions = (mutations: ContactMutations) => {
  const { t } = useTranslation();

  const handleSubmit = async (data: ContactFormInput) => {
    const result = await mutations.submit.mutateAsync(data);

    toast.success(
      t("contact.notifications.success", "Message sent successfully!"),
    );

    return result;
  };

  return {
    handleSubmit,
  };
};
