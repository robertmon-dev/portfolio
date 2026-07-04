import type {
  ListReactionsInput,
  Reaction,
  CreateReactionInput,
  ListReactionsOutput,
  UpdateReactionInput,
} from "@portfolio/shared";

export interface CreatingReactions {
  execute(input: CreateReactionInput): Promise<Reaction>;
}

export interface DeletingReactions {
  execute(ids: string[]): Promise<Reaction[]>;
}

export interface FetchingReactions {
  execute(id: string): Promise<Reaction>;
}

export interface ListingReactions {
  execute(input: ListReactionsInput): Promise<ListReactionsOutput>;
}

export interface ListingReactionsByComment {
  execute(commentId: string): Promise<Reaction[]>;
}

export interface ListingReactionsByPost {
  execute(postId: string): Promise<Reaction[]>;
}

export interface RestoringReactions {
  execute(reactionIds: string[]): Promise<Reaction[]>;
}

export interface UpdatingReactions {
  execute(input: UpdateReactionInput): Promise<Reaction>;
}

export interface ListReactionsServiceInput extends ListReactionsInput {
  limit: number;
  cursor: string;
  includeDeleted: boolean;
}
