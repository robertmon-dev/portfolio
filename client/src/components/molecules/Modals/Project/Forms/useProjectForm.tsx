import { useState, useEffect } from "react";
import { CreateProjectSchema } from "@portfolio/shared";
import type { ProjectFormProps } from "../types";

export const useProjectForm = ({
  initialData,
  onSubmit,
  onCancel,
}: Partial<ProjectFormProps>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    content: initialData?.content ?? "",
    imageUrl: initialData?.imageUrl ?? "",
    demoUrl: initialData?.demoUrl ?? "",
    isFeatured: initialData?.isFeatured ?? false,
    isVisible: initialData?.isVisible ?? true,
  });

  useEffect(() => {
    if (!initialData && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, initialData]);

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate = {
      ...formData,
      imageUrl: formData.imageUrl.trim() || undefined,
      demoUrl: formData.demoUrl.trim() || undefined,
    };

    const validation = CreateProjectSchema.safeParse(dataToValidate);

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        formattedErrors[path] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    onSubmit?.(validation.data);
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    onCancel,
  };
};
