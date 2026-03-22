import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { UpdateUserInputSchema, type UpdateUserInput } from "@portfolio/shared";
import { getRoleOptions } from "../consts";
import type { UpdateUserFormProps } from "../../types";

export const useUpdateUserForm = ({
  initialData,
  onSubmit,
  isLoading,
}: Omit<UpdateUserFormProps, "onCancel">) => {
  const { t } = useTranslation();
  const roleOptions = getRoleOptions(t);

  const [socialsList, setSocialsList] = useState<
    { platform: string; url: string }[]
  >(() => {
    if (!initialData.socials) return [];
    return Object.entries(initialData.socials).map(([platform, url]) => ({
      platform,
      url: String(url),
    }));
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(UpdateUserInputSchema),
    defaultValues: {
      id: initialData.id,
      name: initialData.name || "",
      headline: initialData.headline || "",
      bio: initialData.bio || "",
      avatarUrl: initialData.avatarUrl || "",
      role: initialData.role,
    },
  });

  const isProcessing = isLoading || isSubmitting;

  const handlers = {
    addSocial: () =>
      setSocialsList((prev) => [...prev, { platform: "", url: "" }]),
    removeSocial: (index: number) =>
      setSocialsList((prev) => prev.filter((_, i) => i !== index)),
    updateSocial: (index: number, key: "platform" | "url", value: string) => {
      setSocialsList((prev) => {
        const newList = [...prev];
        newList[index][key] = value;
        return newList;
      });
    },
  };

  const submitForm = handleSubmit((data: UpdateUserInput) => {
    const socialsRecord = socialsList.reduce(
      (acc, curr) => {
        if (curr.platform.trim() && curr.url.trim()) {
          acc[curr.platform.toLowerCase().trim()] = curr.url.trim();
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    onSubmit({
      ...data,
      socials: Object.keys(socialsRecord).length > 0 ? socialsRecord : null,
    });
  });

  return {
    t,
    roleOptions,
    socialsList,
    handlers,
    form: {
      register,
      control,
      errors,
      isProcessing,
      submitForm,
    },
  };
};
