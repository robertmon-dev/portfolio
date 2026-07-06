import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { REACTION_ACTIONS, type ReactionAction } from "./types";
import type {
  CreateReactionInput,
  UpdateReactionInput,
} from "@portfolio/shared";
import type { ReactionMutations } from "./useBlogMutations";

export const useReactionActions = (
  mutations: ReactionMutations,
  dispatch: React.Dispatch<ReactionAction>,
) => {
  const { t } = useTranslation();

  const handleCreate = async (data: CreateReactionInput) => {
    dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: "creating" });
    try {
      await mutations.create.mutateAsync(data);
      toast.success(
        t(
          "admin.reactions.notifications.create.success",
          "Reaction added successfully",
        ),
      );
      dispatch({ type: REACTION_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdate = async (data: UpdateReactionInput) => {
    dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      await mutations.update.mutateAsync(data);
      toast.success(
        t(
          "admin.reactions.notifications.update.success",
          "Reaction updated successfully",
        ),
      );
      dispatch({ type: REACTION_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.remove.mutateAsync({ ids: [id] });
      toast.success(
        t(
          "admin.reactions.notifications.delete.success",
          "Reaction deleted successfully",
        ),
      );
      dispatch({ type: REACTION_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleRestore = async (id: string) => {
    dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.restore.mutateAsync({ ids: [id] });
      toast.success(
        t(
          "admin.reactions.notifications.restore.success",
          "Reaction restored successfully",
        ),
      );
      dispatch({ type: REACTION_ACTIONS.CLOSE_MODALS });
    } finally {
      dispatch({ type: REACTION_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
  };
};
