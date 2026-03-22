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

export const TechStackCategorySchema = z.enum(TECH_STACK_CATEGORIES);

export const TechStackSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required"),
  icon: z.string().nullable().optional(),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
    .nullable()
    .optional(),
  category: TechStackCategorySchema,
});

export const CreateTechStackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
    .optional(),
  category: TechStackCategorySchema.default("Tools"),
});

export const UpdateTechStackSchema = CreateTechStackSchema.partial().extend({
  id: z.uuid(),
});

export const TechStackProjectRelationSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  slug: z.string(),
});

export const TechStackWithRelationsSchema = TechStackSchema.extend({
  projects: z.array(TechStackProjectRelationSchema).default([]),
});

export const LinkTechStackProjectSchema = z.object({
  techStackId: z.uuid(),
  projectId: z.uuid(),
});
