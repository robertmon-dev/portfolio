import type {
  TechStackWithRelations,
  CreateTechStackInput,
  UpdateTechStackInput,
} from "@portfolio/shared";
import type { TechStackActions } from "@/pages/Admin/techstack/types";

export interface TechStackFormProps {
  initialData?: TechStackWithRelations;
  onSubmit: (data: CreateTechStackInput | UpdateTechStackInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface LinkTechStackFormProps {
  techStack: TechStackWithRelations;
  projects: { id: string; title: string }[];
  onSubmit: (projectId: string) => void;
  onUnlink: (techStackId: string, projectId: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface TechStackModalProps {
  state: TechStackActions["state"];
  actions: TechStackActions["actions"];
}
