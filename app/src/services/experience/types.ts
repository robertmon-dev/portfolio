import type {
  Experience,
  CreateExperienceInput,
  UpdateExperienceInput
} from '@portfolio/shared';

export interface ExperienceListing {
  execute(): Promise<Experience[]>;
}

export interface ExperienceRetrieving {
  execute(id: string): Promise<Experience | null>;
}

export interface ExperienceCreating {
  execute(data: CreateExperienceInput): Promise<Experience>;
}

export interface ExperienceUpdating {
  execute(input: { id: string; data: Omit<UpdateExperienceInput, 'id'> }): Promise<Experience>;
}

export interface ExperienceDeleting {
  execute(ids: string[]): Promise<void>;
}
