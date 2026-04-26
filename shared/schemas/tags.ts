import { z } from "zod";
import {
  zUuid,
  zString,
  zText,
  zColor,
  zSafeArray,
  zDateOrString,
} from "./generic";
import { TagCategorySchema } from "./categories";

export const TagSchema = z.object({
  id: zUuid,
  name: zString,
  slug: zString,
  description: zText,
  color: zColor,

  postIds: zSafeArray(zUuid),

  categoryId: zUuid,
  category: TagCategorySchema.nullable(),

  createdAt: zDateOrString,
  updatedAt: zDateOrString,
});
