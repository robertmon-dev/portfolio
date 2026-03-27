import type { Experience, CreateExperienceInput } from "@portfolio/shared";
import type { ExperienceActions } from "@/pages/Admin/experience/types";

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
