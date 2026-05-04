import { z } from "zod";
import * as c from "../schemas/comments";

export type BaseComment = z.infer<typeof c.BaseCommentSchema>;
export type CreateCommentInput = z.infer<typeof c.CreateCommentSchema>;
export type UpdateCommentInput = z.infer<typeof c.UpdateCommentSchema>;
export type CommentWithReplies = z.infer<typeof c.CommentSchema>;
export type DeleteCommentsInput = z.infer<typeof c.DeleteCommentsSchema>;
export type CreateReplyInput = z.infer<typeof c.CreateReplySchema>;
export type ListCommentsInput = z.infer<typeof c.ListCommentsInputSchema>;
export type ListCommentsOutput = z.infer<typeof c.ListCommentsOutputSchema>;
export type ListCommentsByParent = z.infer<typeof c.ListCommentsByParentSchema>;
export type ListCommentsByPost = z.infer<typeof c.ListCommentsByPostSchema>;
