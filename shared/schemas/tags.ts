import { z } from "zod";
import {
  zUuid,
  zString,
  zText,
  zColor,
  zSafeArray,
  zDateOrString,
} from "./generic";
import { FlatCategorySchema } from "./categories";

export const TagSchema = z.object({
  id: zUuid,
  name: zString,
  slug: zString,
  description: zText.nullable(),
  color: zColor.nullable(),

  categoryId: zUuid.nullable(),
  category: FlatCategorySchema.nullable(),

  createdAt: zDateOrString,
  updatedAt: zDateOrString,
});

export const CreateTagSchema = TagSchema.omit({
  id: true,
  category: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateTagSchema = TagSchema.omit({
  category: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
});

export const AssignCategorySchema = TagSchema.pick({
  id: true,
  categoryId: true,
});

export const DeleteTagsSchema = z.object({
  ids: zSafeArray(zUuid),
});

export const ListTagsInputSchema = z.object({
  limit: z.number().min(1).max(50).default(5),
  cursor: zString.optional(),
});

export const ListTagsByCategoryInputSchema = ListTagsInputSchema.extend({
  category: zString,
});

export const ListTagsOutputSchema = z.object({
  items: z.array(TagSchema),
  nextCursor: zString.optional(),
});
