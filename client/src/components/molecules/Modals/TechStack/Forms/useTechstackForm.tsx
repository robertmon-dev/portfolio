import { useState } from "react";
import { CreateTechStackSchema } from "@portfolio/shared";
import type { TechStackFormProps } from "../types";

const DEFAULT_TECH_COLOR = "#7aa2f7";

export const useTechStackForm = ({
  initialData,
  onSubmit,
  onCancel,
}: Partial<TechStackFormProps>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    icon: initialData?.icon ?? "",
    color: initialData?.color ?? DEFAULT_TECH_COLOR,
  });

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate = {
      ...formData,
      icon: formData.icon.trim() || "",
      color: formData.color.trim() || DEFAULT_TECH_COLOR,
    };

    const validation = CreateTechStackSchema.safeParse(dataToValidate);

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        formattedErrors[path] = issue.message;
      });

      setErrors(formattedErrors);
      return;
    }

    if (initialData?.id) {
      onSubmit?.({ ...validation.data, id: initialData.id });
    } else {
      onSubmit?.(validation.data);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    onCancel,
  };
};
