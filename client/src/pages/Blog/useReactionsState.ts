import { useReducer } from "react";
import { reactionReducer, reactionsInitialState } from "./types";
import { useReactionMutations } from "./useBlogMutations";
import { useReactionActions } from "./useReactionsActions";

export const useReactionsState = () => {
  const [state, dispatch] = useReducer(reactionReducer, reactionsInitialState);

  const mutations = useReactionMutations();
  const actions = useReactionActions(mutations, dispatch);

  return {
    state,
    dispatch,
    actions,
  };
};
