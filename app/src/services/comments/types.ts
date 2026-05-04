import type {
  ListCommentsInput,
  ListCommentsByPost,
  ListCommentsByParent,
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
