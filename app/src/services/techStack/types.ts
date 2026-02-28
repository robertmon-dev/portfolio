import {
  TechStack,
  TechStackWithRelations,
  CreateTechStackInput,
  UpdateTechStackInput
} from '@portfolio/shared';

export interface TechStackListing {
  execute(): Promise<TechStackWithRelations[]>;
}

export interface TechStackRetrieving {
  execute(id: string): Promise<TechStackWithRelations | null>;
}

export interface TechStackCreating {
  execute(data: CreateTechStackInput): Promise<TechStack>;
}

export interface TechStackUpdating {
  execute(input: { id: string; data: Omit<UpdateTechStackInput, 'id'> }): Promise<TechStack>;
}

export interface TechStackDeleting {
  execute(ids: string[]): Promise<void>;
}

export interface TechStackProjectLinking {
  execute(input: { techStackId: string; projectId: string }): Promise<TechStack>;
}
