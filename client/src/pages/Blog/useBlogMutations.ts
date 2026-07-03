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

export const useCommentMutations = () => {
  const utils = trpc.useUtils();

  const createComment = trpc.admin.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.listByPost.invalidate();
      utils.comments.listByParent.invalidate();
    },
  });

  const updateComment = trpc.admin.comments.update.useMutation({
    onSuccess: (data) => {
      utils.comments.getById.setData({ id: data.id }, data);
    },
  });

  const deleteComment = trpc.admin.comments.delete.useMutation({
    onSuccess: () => {
      utils.comments.listByPost.invalidate();
      utils.comments.listByParent.invalidate();
      utils.admin.comments.list.invalidate();
    },
  });

  return {
    create: createComment,
    update: updateComment,
    remove: deleteComment,
  };
};

export type CommentMutations = ReturnType<typeof useCommentMutations>;
