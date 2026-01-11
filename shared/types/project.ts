import { z } from 'zod';
import * as p from '../schemas/project';


export type Project = z.infer<typeof p.ProjectSchema>;
export type ProjectWithRelations = z.infer<typeof p.ProjectWithRelationsSchema>;
export type CreateProjectInput = z.infer<typeof p.CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof p.UpdateProjectSchema>;
