import { z } from 'zod';

export const TechStackSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  icon: z.string().nullable(),
  category: z.string(),
  color: z.string().nullable(),
});

export const CreateTechStackSchema = TechStackSchema.omit({ id: true });
export const UpdateTechStackSchema = TechStackSchema.partial().extend({ id: z.string().uuid() });
