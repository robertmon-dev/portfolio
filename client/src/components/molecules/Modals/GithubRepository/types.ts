import type { GithubRepo, UpdateGithubRepoInput, ProjectWithRelations } from "@portfolio/shared";
import type { GithubActions } from "@/pages/Admin/repos/types";


export interface GithubModalsProps {
  state: GithubActions['state'];
  actions: GithubActions['actions'];
}

export interface UpdateFormProps {
  repo: GithubRepo;
  onSubmit: (data: UpdateGithubRepoInput) => void;
  isLoading: boolean;
}

export interface LinkFormProps {
  repo: GithubRepo;
  projects: ProjectWithRelations[];
  onSubmit: (projectId: string) => void;
  isLoading: boolean;
}
