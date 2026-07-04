import { usePostsState } from "./usePostsState";

export const POST_ACTIONS = {
  SET_PROCESSING: "POST/SET_PROCESSING",
  SELECT_POST: "POST/SELECT_POST",
  OPEN_MODAL: "POST/OPEN_MODAL",
  CLOSE_MODALS: "POST/CLOSE_MODALS",
} as const;

export type PostModalType = "CREATE" | "UPDATE" | "DELETE" | null;

export interface PostState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: PostModalType;
}

export type PostAction =
  | { type: typeof POST_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof POST_ACTIONS.SELECT_POST; payload: string | null }
  | { type: typeof POST_ACTIONS.OPEN_MODAL; payload: PostModalType }
  | { type: typeof POST_ACTIONS.CLOSE_MODALS };

export const initialState: PostState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export function postReducer(state: PostState, action: PostAction): PostState {
  switch (action.type) {
    case POST_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };
    case POST_ACTIONS.SELECT_POST:
      return { ...state, selectedId: action.payload };
    case POST_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };
    case POST_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}

export type PostAdminActions = ReturnType<typeof usePostsState>;
