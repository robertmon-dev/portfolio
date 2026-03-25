import { z } from "zod";

export const ExperienceSchema = z.object({
  id: z.uuid(),
  position: z.string().min(1),
  company: z.string().min(1),
  startDate: z.date().or(z.string()),
  endDate: z.date().or(z.string()).nullable(),
  description: z.string(),
  isCurrent: z.boolean(),
  createdAt: z.date().or(z.string()),
});

export const CreateExperienceSchema = ExperienceSchema.omit({
  id: true,
  createdAt: true,
}).refine(
  (data) => {
    if (data.isCurrent || !data.endDate) return true;

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    return end > start;
  },
  {
    message: "End date must be after the start date",
    path: ["endDate"],
  },
);

export const UpdateExperienceSchema = ExperienceSchema.partial()
  .extend({
    id: z.uuid(),
  })
  .refine(
    (data) => {
      if (data.isCurrent || !data.endDate || !data.startDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    {
      message: "End date must be after the start date",
      path: ["endDate"],
    },
  );
