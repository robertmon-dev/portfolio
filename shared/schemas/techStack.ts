import { z } from "zod";
import { zUuid, zString, zColor, zSafeArray } from "./generic";

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
  id: zUuid,
  name: zString.min(1, "Name is required"),
  icon: zString.nullable().optional(),
  color: zColor.nullable().optional(),
  category: TechStackCategorySchema,
});

export const CreateTechStackSchema = z.object({
  name: zString.min(1, "Name is required"),
  icon: zString.optional(),
  color: zColor.optional(),
  category: TechStackCategorySchema,
});

export const UpdateTechStackSchema = CreateTechStackSchema.partial().extend({
  id: zUuid,
});

export const TechStackProjectRelationSchema = z.object({
  id: zUuid,
  title: zString,
  slug: zString,
});

export const TechStackWithRelationsSchema = TechStackSchema.extend({
  projects: zSafeArray(TechStackProjectRelationSchema).default([]),
});

export const LinkTechStackProjectSchema = z.object({
  techStackId: zUuid,
  projectId: zUuid,
});

export const DeleteTechStackInputSchema = z.object({
  ids: zSafeArray(zUuid),
});

export const TechStackOpenApiSchemas = {
  TechStackCategorySchema,
  TechStackSchema,
  CreateTechStackSchema,
  UpdateTechStackSchema,
  TechStackProjectRelationSchema,
  TechStackWithRelationsSchema,
  LinkTechStackProjectSchema,
};
