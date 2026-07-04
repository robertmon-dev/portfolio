import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import {
  COMMENT_ACTIONS,
  commentReducer,
  commentsInitialState,
  type CommentModalType,
} from "@/pages/Blog/types";
import { useCommentMutations } from "@/pages/Blog/useBlogMutations";
import { useCommentActions } from "@/pages/Blog/useCommentsActions";
import type { UpdateCommentInput } from "@portfolio/shared";

export const useCommentsAdminState = () => {
  const utils = trpc.useUtils();
  const [state, dispatch] = useReducer(commentReducer, commentsInitialState);

  const mutations = useCommentMutations();
  const handlers = useCommentActions(mutations, dispatch);

  const { data, isLoading: isCommentsLoading } =
    trpc.admin.comments.list.useQuery({ limit: 50 });
  const comments = useMemo(() => data?.items ?? [], [data]);

  const selectedComment = useMemo(
    () => comments.find((c) => c.id === state.selectedId) || null,
    [comments, state.selectedId],
  );

  const invalidate = async () => {
    await Promise.all([
      utils.admin.comments.list.invalidate(),
      utils.comments.listByPost.invalidate(),
    ]);
  };

  return {
    state: {
      ...state,
      comments,
      selectedComment,
      isLoading: isCommentsLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions: {
      selectComment: (id: string | null) =>
        dispatch({ type: COMMENT_ACTIONS.SELECT_COMMENT, payload: id }),

      openModal: (type: CommentModalType, id?: string) => {
        if (id) {
          dispatch({ type: COMMENT_ACTIONS.SELECT_COMMENT, payload: id });
        }
        dispatch({ type: COMMENT_ACTIONS.OPEN_MODAL, payload: type });
      },

      closeModals: () => dispatch({ type: COMMENT_ACTIONS.CLOSE_MODALS }),

      updateComment: async (input: UpdateCommentInput) => {
        await handlers.handleUpdate(input);
        await invalidate();
      },

      deleteComment: async (id: string) => {
        await handlers.handleDelete(id);
        await invalidate();
      },
    },
  };
};
