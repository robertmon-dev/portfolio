import { z } from "zod";
import { zUuid, zString, zDateOrString, zSafeArray } from "./generic";

export interface Category {
  id: string;
  name: string;

  parentId: string | null;
  categories: Category[];

  createdAt: string | Date;
  updatedAt: string | Date;
}

export const FlatCategorySchema = z.object({
  id: zUuid,
  name: zString,

  createdAt: zDateOrString,
  updatedAt: zDateOrString,
});

export const TagCategorySchema = z.object({
  id: zUuid,
  name: zString,

  parentId: zUuid.nullable(),
  categories: zSafeArray(FlatCategorySchema),

  createdAt: zDateOrString,
  updatedAt: zDateOrString,
});

export const CreateTagCategorySchema = FlatCategorySchema.extend({
  parentId: zUuid.nullable(),
}).omit({ updatedAt: true, createdAt: true, id: true });

export const UpdateTagCategorySchema = FlatCategorySchema.omit({
  updatedAt: true,
  createdAt: true,
});

export const AssignTagsSchema = z.object({
  tagCategoryId: zUuid,
  tags: zSafeArray(zUuid).transform((ids) => ({
    set: ids.map((id) => ({ id })),
  })),
});

export const ListTagCategoriesInputSchema = z.object({
  limit: z.number().min(1).max(50).default(5),
  cursor: zString.optional(),
});

export const ListTagCategoriesOutputSchema = z.object({
  items: zSafeArray(TagCategorySchema),
  nextCursor: zString.optional(),
});
