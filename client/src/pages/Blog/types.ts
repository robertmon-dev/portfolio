import { useCommentsState } from "./useCommentsState";
import { useReactionsState } from "./useReactionsState";

export const COMMENT_ACTIONS = {
  SET_PROCESSING: "COMMENT/SET_PROCESSING",
  SELECT_COMMENT: "COMMENT/SELECT_COMMENT",
  OPEN_MODAL: "COMMENT/OPEN_MODAL",
  CLOSE_MODALS: "COMMENT/CLOSE_MODALS",
} as const;

export const REACTION_ACTIONS = {
  SET_PROCESSING: "REACTION/SET_PROCESSING",
  SELECT_REACTION: "REACTION/SELECT_REACTION",
  OPEN_MODAL: "REACTION/OPEN_MODAL",
  CLOSE_MODALS: "REACTION/CLOSE_MODALS",
} as const;

export type CommentModalType = "CREATE" | "UPDATE" | "DELETE" | null;
export type ReactionModalType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "RESTORE"
  | null;

export interface CommentState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: CommentModalType;
}

export interface ReactionState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: ReactionModalType;
}

export type CommentAction =
  | { type: typeof COMMENT_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof COMMENT_ACTIONS.SELECT_COMMENT; payload: string | null }
  | { type: typeof COMMENT_ACTIONS.OPEN_MODAL; payload: CommentModalType }
  | { type: typeof COMMENT_ACTIONS.CLOSE_MODALS };

export type ReactionAction =
  | { type: typeof REACTION_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof REACTION_ACTIONS.SELECT_REACTION; payload: string | null }
  | { type: typeof REACTION_ACTIONS.OPEN_MODAL; payload: ReactionModalType }
  | { type: typeof REACTION_ACTIONS.CLOSE_MODALS };

export const commentsInitialState: CommentState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export const reactionsInitialState: ReactionState = {
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

export function reactionReducer(
  state: ReactionState,
  action: ReactionAction,
): ReactionState {
  switch (action.type) {
    case REACTION_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };
    case REACTION_ACTIONS.SELECT_REACTION:
      return { ...state, selectedId: action.payload };
    case REACTION_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };
    case REACTION_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}

export type CommentActionsType = ReturnType<typeof useCommentsState>;
export type ReactionActionsType = ReturnType<typeof useReactionsState>;
