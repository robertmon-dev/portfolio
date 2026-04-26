import { z } from "zod";
import { zUuid, zString, zDateOrString, zSafeArray } from "./generic";

export interface TagCategory {
  id: string;
  name: string;

  parentId: string | null;
  categories: TagCategory[];

  createdAt: string | Date;
  updatedAt: string | Date;
}

export const TagCategorySchema: z.ZodType<TagCategory> = z.lazy(() =>
  z.object({
    id: zUuid,
    name: zString,

    parentId: zUuid.nullable(),
    categories: zSafeArray(TagCategorySchema),

    createdAt: zDateOrString,
    updatedAt: zDateOrString,
  }),
);
