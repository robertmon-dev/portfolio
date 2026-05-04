import z from "zod";
import * as c from "../schemas/categories";

export type FlatCategory = z.infer<typeof c.FlatCategorySchema>;
export type TagCategory = z.infer<typeof c.TagCategorySchema>;

export type CreateTagCategoryInput = z.infer<typeof c.CreateTagCategorySchema>;
export type UpdateTagCategoryInput = z.infer<typeof c.UpdateTagCategorySchema>;

export type AssignTagsInput = z.infer<typeof c.AssignTagsSchema>;

export type ListTagCategoriesInput = z.infer<
  typeof c.ListTagCategoriesInputSchema
>;
export type ListTagCategoriesOutput = z.infer<
  typeof c.ListTagCategoriesOutputSchema
>;
