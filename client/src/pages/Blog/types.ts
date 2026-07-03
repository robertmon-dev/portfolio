import { useCommentsState } from "./useCommentsState";

export const COMMENT_ACTIONS = {
  SET_PROCESSING: "COMMENT/SET_PROCESSING",
  SELECT_COMMENT: "COMMENT/SELECT_COMMENT",
  OPEN_MODAL: "COMMENT/OPEN_MODAL",
  CLOSE_MODALS: "COMMENT/CLOSE_MODALS",
} as const;

export type CommentModalType = "CREATE" | "UPDATE" | "DELETE" | null;

export interface CommentState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: CommentModalType;
}

export type CommentAction =
  | { type: typeof COMMENT_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof COMMENT_ACTIONS.SELECT_COMMENT; payload: string | null }
  | { type: typeof COMMENT_ACTIONS.OPEN_MODAL; payload: CommentModalType }
  | { type: typeof COMMENT_ACTIONS.CLOSE_MODALS };

export const initialState: CommentState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export function commentReducer(
  state: CommentState,
  action: CommentAction,
): CommentState {
  switch (action.type) {
    case COMMENT_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };
    case COMMENT_ACTIONS.SELECT_COMMENT:
      return { ...state, selectedId: action.payload };
    case COMMENT_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };
    case COMMENT_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}

export type CommentActionsType = ReturnType<typeof useCommentsState>;
