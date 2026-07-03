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

export const usePostReactionsQueries = (postId: string) => {
  return trpc.reactions.listByPost.useQuery(
    { id: postId },
    {
      staleTime: STALE_TIME,
      enabled: !!postId,
    },
  );
};

export const useCommentReactionsQueries = (commentId: string) => {
  return trpc.reactions.listByComment.useQuery(
    { id: commentId },
    {
      staleTime: STALE_TIME,
      enabled: !!commentId,
    },
  );
};

export const useCommentMutations = () => {
  const createComment = trpc.admin.comments.create.useMutation();
  const updateComment = trpc.admin.comments.update.useMutation();
  const deleteComment = trpc.admin.comments.delete.useMutation();

  return {
    create: createComment,
    update: updateComment,
    remove: deleteComment,
  };
};

export type CommentMutations = ReturnType<typeof useCommentMutations>;
