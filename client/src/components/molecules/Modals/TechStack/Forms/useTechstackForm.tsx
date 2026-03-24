import { useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTechStackSchema } from "@portfolio/shared";
import type {
  CreateTechStackInput,
  TechStackCategory,
} from "@portfolio/shared";
import type { TechStackFormProps } from "../types";

const DEFAULT_TECH_COLOR = "#7aa2f7";

export const useTechStackForm = ({
  initialData,
  onCreate,
  onUpdate,
}: Partial<TechStackFormProps>) => {
  const defaultValues = useMemo(
    (): CreateTechStackInput => ({
      name: initialData?.name ?? "",
      category: (initialData?.category as TechStackCategory) ?? "Tools",
      icon: initialData?.icon ?? undefined,
      color: initialData?.color ?? DEFAULT_TECH_COLOR,
    }),
    [initialData],
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTechStackInput>({
    resolver: zodResolver(CreateTechStackSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmitHandler: SubmitHandler<CreateTechStackInput> = (data) => {
    if (initialData?.id) {
      onUpdate?.({
        ...data,
        id: initialData.id,
      });
    } else {
      onCreate?.(data);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmitHandler),
    errors,
    setValue,
    watch,
  };
};
