import { z } from "zod";
import * as p from "../schemas/post";

export type Post = z.infer<typeof p.PostSchema>;
export type CreatePostInput = z.infer<typeof p.CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof p.UpdatePostSchema>;
export type AssignTagsForPostInput = z.infer<typeof p.AssignTagsForPostSchema>;
export type ChangeVisibilityForPostInput = z.infer<
  typeof p.ChangeVisibilityForPostSchema
>;
export type AssignCommentsForPostInput = z.infer<
  typeof p.AssignCommentsForPostSchema
>;
export type ChangePublishionForPostInput = z.infer<
  typeof p.ChangePublishionForPostSchema
>;
export type DeletePostInput = z.infer<typeof p.DeletePostSchema>;
export type ListPostsInput = z.infer<typeof p.ListPostsInputSchema>;
export type ListPostsOutput = z.infer<typeof p.ListPostsOutputSchema>;
