import { z } from "zod";
import * as e from "../schemas/experience";

export type Experience = z.infer<typeof e.ExperienceSchema>;
export type CreateExperienceInput = z.infer<typeof e.CreateExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof e.UpdateExperienceSchema>;
export type DeleteExperienceInput = z.infer<
  typeof e.DeleteExperienceInputSchema
>;
