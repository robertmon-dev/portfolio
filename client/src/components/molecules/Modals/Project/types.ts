import type { ProjectWithRelations, ProjectFormData } from "@portfolio/shared";
import type { ProjectActions } from "@/pages/Admin/projects/types";

export interface ProjectFormProps {
  initialData?: Partial<ProjectWithRelations> | null;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface ProjectModalsProps {
  state: ProjectActions["state"];
  actions: ProjectActions["actions"];
}
