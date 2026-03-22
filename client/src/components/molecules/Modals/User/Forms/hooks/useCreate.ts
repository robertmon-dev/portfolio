import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { CreateUserInputSchema, type CreateUserInput } from "@portfolio/shared";
import { getRoleOptions } from "../consts";
import type { CreateUserFormProps } from "../../types";

export const useCreateUserForm = ({
  onSubmit,
  isLoading,
}: Omit<CreateUserFormProps, "onCancel">) => {
  const { t } = useTranslation();
  const roleOptions = getRoleOptions(t);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserInputSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      name: "",
      role: "USER",
    },
  });

  const isProcessing = isLoading || isSubmitting;
  const submitForm = handleSubmit(onSubmit);

  return {
    t,
    roleOptions,
    form: {
      register,
      control,
      errors,
      isProcessing,
      submitForm,
    },
  };
};
