import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import {
  REACTION_ACTIONS,
  reactionReducer,
  reactionsInitialState,
  type ReactionModalType,
} from "@/pages/Blog/types";
import { useReactionMutations } from "@/pages/Blog/useBlogMutations";
import { useReactionActions } from "@/pages/Blog/useReactionsActions";

export const useReactionsAdminState = () => {
  const utils = trpc.useUtils();
  const [state, dispatch] = useReducer(reactionReducer, reactionsInitialState);

  const mutations = useReactionMutations();
  const handlers = useReactionActions(mutations, dispatch);

  const { data, isLoading: isReactionsLoading } =
    trpc.admin.reactions.list.useQuery({ limit: 50 });
  const reactions = useMemo(() => data?.items ?? [], [data]);

  const selectedReaction = useMemo(
    () => reactions.find((r) => r.id === state.selectedId) || null,
    [reactions, state.selectedId],
  );

  const invalidate = async () => {
    await Promise.all([
      utils.admin.reactions.list.invalidate(),
      utils.reactions.listByPost.invalidate(),
      utils.reactions.listByComment.invalidate(),
    ]);
  };

  return {
    state: {
      ...state,
      reactions,
      selectedReaction,
      isLoading: isReactionsLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions: {
      selectReaction: (id: string | null) =>
        dispatch({ type: REACTION_ACTIONS.SELECT_REACTION, payload: id }),

      openModal: (type: ReactionModalType, id?: string) => {
        if (id) {
          dispatch({ type: REACTION_ACTIONS.SELECT_REACTION, payload: id });
        }
        dispatch({ type: REACTION_ACTIONS.OPEN_MODAL, payload: type });
      },

      closeModals: () => dispatch({ type: REACTION_ACTIONS.CLOSE_MODALS }),

      deleteReaction: async (id: string) => {
        await handlers.handleDelete(id);
        await invalidate();
      },
    },
  };
};
