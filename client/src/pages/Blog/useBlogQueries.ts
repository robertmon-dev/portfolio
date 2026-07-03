import { trpc } from "@/lib/trpc/client";
import { STALE_TIME } from "@/lib/consts/cache";
import type {
  ListPostsInput,
  ListPostsOutput,
  ListReactionsInput,
  ListReactionsOutput,
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
