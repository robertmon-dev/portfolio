import z from "zod";
import * as t from "../schemas/tags";

export type Tag = z.infer<typeof t.TagSchema>;
export type CreateTagInput = z.infer<typeof t.CreateTagSchema>;
export type UpdateTagInput = z.infer<typeof t.UpdateTagSchema>;
export type AssignCategoryInput = z.infer<typeof t.AssignCategorySchema>;
export type DeleteTagsInput = z.infer<typeof t.DeleteTagsSchema>;

export type ListTagsInput = z.infer<typeof t.ListTagsInputSchema>;
export type ListTagsByCategoryInput = z.infer<
  typeof t.ListTagsByCategoryInputSchema
>;
export type ListTagsOutput = z.infer<typeof t.ListTagsOutputSchema>;
