import { trpc } from "@/lib/trpc/client";
import { STALE_TIME } from "@/lib/consts/cache";
import type {
  ListPostsInput,
  ListPostsOutput,
  ListReactionsInput,
  ListReactionsOutput,
  ListCommentsByPost,
  ListCommentsByParent,
  ListCommentsOutput,
  ListCommentsInput,
} from "@portfolio/shared";

export const useBlogQueries = (options: ListPostsInput = { limit: 10 }) => {
  return {
    list: trpc.posts.list.useQuery(options, { staleTime: STALE_TIME }),

    infinite: trpc.posts.list.useInfiniteQuery(options, {
      getNextPageParam: (lastPage: ListPostsOutput) => lastPage.nextCursor,
      staleTime: STALE_TIME,
    }),
  };
};

export const useAdminCommentsQueries = (
  options: ListCommentsInput = { limit: 2 },
) => {
  return {
    list: trpc.admin.comments.list.useQuery(options, { staleTime: STALE_TIME }),
    infinite: trpc.admin.comments.list.useInfiniteQuery(options, {
      getNextPageParam: (lastPage: ListCommentsOutput) => lastPage.nextCursor,
      staleTime: STALE_TIME,
    }),
  };
};

export const usePostCommentsQueries = (options: ListCommentsByPost) => {
  return {
    list: trpc.comments.listByPost.useQuery(options, {
      staleTime: STALE_TIME,
      enabled: !!options.postId,
    }),
    infinite: trpc.comments.listByPost.useInfiniteQuery(options, {
      getNextPageParam: (lastPage: ListCommentsOutput) => lastPage.nextCursor,
      staleTime: STALE_TIME,
      enabled: !!options.postId,
    }),
  };
};

export const useComment = (id: string) => {
  return trpc.comments.getById.useQuery(
    { id },
    {
      staleTime: STALE_TIME,
      enabled: !!id,
    },
  );
};

export const useCommentRepliesQueries = (options: ListCommentsByParent) => {
  return {
    list: trpc.comments.listByParent.useQuery(options, {
      staleTime: STALE_TIME,
      enabled: !!options.parentId,
    }),
    infinite: trpc.comments.listByParent.useInfiniteQuery(options, {
      getNextPageParam: (lastPage: ListCommentsOutput) => lastPage.nextCursor,
      staleTime: STALE_TIME,
      enabled: !!options.parentId,
    }),
  };
};

export const useReactionsQueries = (options: ListReactionsInput = {}) => {
  return {
    list: trpc.reactions.list.useQuery(options, { staleTime: STALE_TIME }),

    infinite: trpc.reactions.list.useInfiniteQuery(options, {
      getNextPageParam: (lastPage: ListReactionsOutput) => lastPage.nextCursor,
      staleTime: STALE_TIME,
    }),
  };
};

export type BlogQueries = ReturnType<typeof useBlogQueries>;
export type ReactionQueries = ReturnType<typeof useReactionsQueries>;
