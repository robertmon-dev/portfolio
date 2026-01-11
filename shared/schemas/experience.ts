import { z } from 'zod';

export const ExperienceSchema = z.object({
  id: z.string().uuid(),
  position: z.string().min(1),
  company: z.string().min(1),
  startDate: z.date().or(z.string()),
  endDate: z.date().or(z.string()).nullable(),
  description: z.string(),
  isCurrent: z.boolean().default(false),
  createdAt: z.date().or(z.string()),
});

export const CreateExperienceSchema = ExperienceSchema.omit({ id: true, createdAt: true });
export const UpdateExperienceSchema = ExperienceSchema.partial().extend({ id: z.string().uuid() });
