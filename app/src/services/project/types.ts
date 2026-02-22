import {
  ListProjectsOptions,
  ProjectWithRelations,
  CreateProjectInput,
  UpdateProjectInput
} from '@portfolio/shared';

export interface ProjectListing {
  execute(options: ListProjectsOptions): Promise<ProjectWithRelations[]>;
}

export interface ProjectRetrieving {
  execute(slug: string): Promise<ProjectWithRelations | null>;
}

export interface ProjectCreating {
  execute(data: CreateProjectInput): Promise<ProjectWithRelations>;
}

export interface ProjectUpdating {
  execute(id: string, data: UpdateProjectInput): Promise<ProjectWithRelations>;
}

export interface ProjectDeleting {
  execute(id: string): Promise<ProjectWithRelations>;
}
