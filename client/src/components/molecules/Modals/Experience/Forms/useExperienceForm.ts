import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExperienceSchema,
  type CreateExperienceInput,
} from "@portfolio/shared";
import type { UseExperienceFormProps } from "../types";

export const useExperienceForm = ({
  initialData,
  onSubmit,
}: UseExperienceFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateExperienceInput>({
    resolver: zodResolver(CreateExperienceSchema),
    defaultValues: initialData ?? {
      position: "",
      company: "",
      startDate: "",
      endDate: null,
      description: "",
      isCurrent: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        startDate: initialData.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : "",
        endDate: initialData.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : null,
      };
      reset(formattedData);
    }
  }, [initialData, reset]);

  const isCurrent = watch("isCurrent");
  useEffect(() => {
    if (isCurrent) {
      setValue("endDate", null, { shouldValidate: true });
    }
  }, [isCurrent, setValue]);

  return {
    register,
    handleSubmit: handleSubmit((data) => onSubmit(data)),
    errors,
    watch,
    setValue,
  };
};
