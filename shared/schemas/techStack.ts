import { z } from "zod";

export const TECH_STACK_CATEGORIES = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "Infrastructure",
  "Database",
  "Design",
  "Tools",
] as const;

export type TechStackCategory = (typeof TECH_STACK_CATEGORIES)[number];

export const TechStackSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  icon: z.string().nullable(),
  category: z.preprocess(
    (val) => {
      if (!val || val === "") return "Tools";

      if (typeof val === "string") {
        const found = TECH_STACK_CATEGORIES.find(
          (cat) => cat.toLowerCase() === val.toLowerCase(),
        );
        return found || "Tools";
      }
      return val;
    },
    z.enum(TECH_STACK_CATEGORIES, {
      errorMap: () => ({ message: "Please select a valid category" }),
    }),
  ),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
    .nullable(),
});

export const CreateTechStackSchema = TechStackSchema.omit({ id: true });

export const UpdateTechStackSchema = TechStackSchema.partial().extend({
  id: z.string().uuid(),
});

export const TechStackProjectRelationSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
});

export const TechStackWithRelationsSchema = TechStackSchema.extend({
  projects: z.array(TechStackProjectRelationSchema).default([]),
});

export const LinkTechStackProjectSchema = z.object({
  techStackId: z.string().uuid(),
  projectId: z.string().uuid(),
});
