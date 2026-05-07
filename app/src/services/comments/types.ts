import type {
  ListCommentsInput,
  ListCommentsByPost,
  ListCommentsByParent,
  ListCommentsOutput,
  CreateCommentInput,
  CommentWithReplies,
  DeleteCommentsInput,
  UpdateCommentInput,
} from "@portfolio/shared";

export interface ListCommentsServiceInput extends ListCommentsInput {
  includeDeleted: boolean;
}

export interface ListCommentsByPostServiceInput extends ListCommentsByPost {
  includeDeleted: boolean;
}

export interface ListCommentsByParentServiceInput extends ListCommentsByParent {
  includeDeleted: boolean;
}

export interface GetCommentByIdServiceInput {
  commentId: string;
  includeDeleted: boolean;
}

export interface ListingCommentsByParent {
  execute(input: ListCommentsByParentServiceInput): Promise<ListCommentsOutput>;
}

export interface ListingCommentsByPost {
  execute(input: ListCommentsByPostServiceInput): Promise<ListCommentsOutput>;
}

export interface CreatingComments {
  execute(input: CreateCommentInput): Promise<CommentWithReplies>;
}

export interface DeletingComments {
  execute(input: DeleteCommentsInput): Promise<CommentWithReplies[]>;
}

export interface FetchingComments {
  execute(input: GetCommentByIdServiceInput): Promise<CommentWithReplies>;
}

export interface ListingComments {
  execute(input: ListCommentsServiceInput): Promise<ListCommentsOutput>;
}

export interface UpdatingComments {
  execute(input: UpdateCommentInput): Promise<CommentWithReplies>;
}
