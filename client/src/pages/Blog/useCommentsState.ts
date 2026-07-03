import { useReducer } from "react";
import { commentReducer, initialState } from "./types";
import { useCommentMutations } from "./useBlogMutations";
import { useCommentActions } from "./useCommentsActions";

export const useCommentsState = () => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const mutations = useCommentMutations();
  const actions = useCommentActions(mutations, dispatch);

  return {
    state,
    dispatch,
    actions,
  };
};
