import { z } from 'zod';
import * as t from '../schemas/techStack';

export type TechStack = z.infer<typeof t.TechStackSchema>;
export type CreateTechStackInput = z.infer<typeof t.CreateTechStackSchema>;
export type UpdateTechStackInput = z.infer<typeof t.UpdateTechStackSchema>;
export type TechStackWithRelations = z.infer<typeof t.TechStackWithRelationsSchema>;
