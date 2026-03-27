import type { ReactNode } from "react";
import type { Experience, CreateExperienceInput } from "@portfolio/shared";
import type { ExperienceActions } from "@/pages/Admin/experience/types";
import type { TFunction } from "i18next";
import type { Control, Path } from "react-hook-form";

export interface ExperienceModalProps {
  state: ExperienceActions["state"];
  actions: ExperienceActions["actions"];
}

export interface ExperienceFormProps {
  initialData?: Partial<Experience> | null;
  onSubmit: (data: CreateExperienceInput) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface UseExperienceFormProps {
  initialData?: Partial<Experience> | null;
  onSubmit: (data: CreateExperienceInput) => void;
}

export interface MonthYearSelectorProps {
  name: Path<CreateExperienceInput>;
  control: Control<CreateExperienceInput>;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
  t: TFunction;
  error?: string;
}
