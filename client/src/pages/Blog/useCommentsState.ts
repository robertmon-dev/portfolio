import { useReducer } from "react";
import { commentReducer, commentsInitialState } from "./types";
import { useCommentMutations } from "./useBlogMutations";
import { useCommentActions } from "./useCommentsActions";

export const useCommentsState = () => {
  const [state, dispatch] = useReducer(commentReducer, commentsInitialState);

  const mutations = useCommentMutations();
  const actions = useCommentActions(mutations, dispatch);

  return {
    state,
    dispatch,
    actions,
  };
};
