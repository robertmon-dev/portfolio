import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProjectSchema,
  type CreateProjectInput,
} from "@portfolio/shared";
import type { ProjectFormProps } from "../types";

export const useProjectForm = ({
  initialData,
  onSubmit,
}: Partial<ProjectFormProps>) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: initialData ?? {
      title: "",
      slug: "",
      description: "",
      content: "",
      imageUrl: "",
      demoUrl: "",
      isFeatured: false,
      isVisible: true,
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const watchedTitle = watch("title");

  useEffect(() => {
    if (!initialData && !dirtyFields.slug && watchedTitle) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      setValue("slug", slug, { shouldValidate: true });
    }
  }, [watchedTitle, initialData, dirtyFields.slug, setValue]);

  return {
    register,
    handleSubmit: handleSubmit((data) => onSubmit?.(data)),
    errors,
    watch,
    setValue,
  };
};
