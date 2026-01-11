import { z } from 'zod';
import * as t from '../schemas/techStack';


export type TechStack = z.infer<typeof t.TechStackSchema>;
export type CreateTechStackInput = z.infer<typeof t.CreateTechStackSchema>;
