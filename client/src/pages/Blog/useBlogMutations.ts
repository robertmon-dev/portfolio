import { trpc } from "@/lib/trpc/client";
import { STALE_TIME } from "@/lib/consts/cache";

export const useReaction = (id: string) => {
  return trpc.reactions.getById.useQuery(
    { id },
    {
      staleTime: STALE_TIME,
      enabled: !!id,
    },
  );
};

export const usePostReactions = (postId: string) => {
  return trpc.reactions.listByPost.useQuery(
    { id: postId },
    {
      staleTime: STALE_TIME,
      enabled: !!postId,
    },
  );
};

export const useCommentReactions = (commentId: string) => {
  return trpc.reactions.listByComment.useQuery(
    { id: commentId },
    {
      staleTime: STALE_TIME,
      enabled: !!commentId,
    },
  );
};
