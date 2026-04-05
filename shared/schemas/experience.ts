import { z } from "zod";
import { zUuid, zString, zText, zDateOrString, zSafeArray } from "./generic";

export const ExperienceSchema = z.object({
  id: zUuid,
  position: zString.min(1),
  company: zString.min(1),
  startDate: zDateOrString,
  endDate: zDateOrString.nullable(),
  description: zText,
  notes: zText.nullable(),
  isCurrent: z.boolean(),
  createdAt: zDateOrString,
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
    id: zUuid,
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

export const DeleteExperienceInputSchema = z.object({
  ids: zSafeArray(zUuid),
});
