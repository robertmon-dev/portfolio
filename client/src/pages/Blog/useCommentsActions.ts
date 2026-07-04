import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { COMMENT_ACTIONS, type CommentAction } from "./types";
import type { CreateCommentInput, UpdateCommentInput } from "@portfolio/shared";
import type { CommentMutations } from "./useBlogMutations";

export const useCommentActions = (
  mutations: CommentMutations,
  dispatch: React.Dispatch<CommentAction>,
) => {
  const { t } = useTranslation();

  const handleCreate = async (data: CreateCommentInput) => {
    dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: "creating" });
    try {
      await mutations.create.mutateAsync(data);
      toast.success(
        t(
          "admin.comments.notifications.create.success",
          "Comment created successfully",
        ),
      );
      dispatch({ type: COMMENT_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdate = async (data: UpdateCommentInput) => {
    dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      await mutations.update.mutateAsync(data);
      toast.success(
        t(
          "admin.comments.notifications.update.success",
          "Comment updated successfully",
        ),
      );
      dispatch({ type: COMMENT_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.remove.mutateAsync({ commentIds: [id] });
      toast.success(
        t(
          "admin.comments.notifications.delete.success",
          "Comment deleted successfully",
        ),
      );
      dispatch({ type: COMMENT_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleRestore = async (id: string) => {
    dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.restore.mutateAsync({ commentIds: [id] });
      toast.success(
        t(
          "admin.comments.notifications.restore.success",
          "Comment restored successfully",
        ),
      );
      dispatch({ type: COMMENT_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: COMMENT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
  };
};
