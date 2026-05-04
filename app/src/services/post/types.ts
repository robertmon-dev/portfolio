import type {
  AssignCommentsForPostInput,
  AssignReactionsForPostInput,
  AssignTagsForPostInput,
  ChangePublishionForPostInput,
  CreatePostInput,
  ListPostsInput,
  DeletePostInput,
  ListPostsOutput,
  UpdatePostInput,
  Post,
} from "@portfolio/shared";

export interface ListPostsServiceInput extends ListPostsInput {
  includeDeleted: boolean;
}

export interface AssigningComments {
  execute(input: AssignCommentsForPostInput): Promise<Post>;
}

export interface AssigningReactions {
  execute(input: AssignReactionsForPostInput): Promise<Post>;
}

export interface AssigningReactions {
  execute(input: AssignReactionsForPostInput): Promise<Post>;
}

export interface AssigningTags {
  execute(input: AssignTagsForPostInput): Promise<Post>;
}

export interface ChangingVisibility {
  execute(input: ChangePublishionForPostInput): Promise<Post>;
}

export interface CreatingPosts {
  execute(input: CreatePostInput): Promise<Post>;
}

export interface DeletingPosts {
  execute(input: DeletePostInput): Promise<Post>;
}

export interface FetchingPosts {
  execute(postId: string): Promise<Post>;
}

export interface ListingPosts {
  execute(input: ListPostsServiceInput): Promise<ListPostsOutput>;
}

export interface UpdatingPosts {
  execute(input: UpdatePostInput): Promise<Post>;
}
