import type { ReactNode } from "react";
import type { Path, Control } from "react-hook-form";
import type { CreateExperienceInput } from "@portfolio/shared";
import type { TFunction } from "i18next";

export interface MonthYearSelectorProps {
  name: Path<CreateExperienceInput>;
  control: Control<CreateExperienceInput>;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
  t: TFunction;
  error?: string;
}
