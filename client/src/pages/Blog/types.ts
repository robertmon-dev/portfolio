export const COMMENT_ACTIONS = {
  SET_PROCESSING: "SET_PROCESSING",
  CLOSE_MODALS: "CLOSE_MODALS",
  OPEN_CREATE_MODAL: "OPEN_CREATE_MODAL",
  OPEN_EDIT_MODAL: "OPEN_EDIT_MODAL",
  OPEN_DELETE_MODAL: "OPEN_DELETE_MODAL",
} as const;

export type CommentAction =
  | { type: typeof COMMENT_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof COMMENT_ACTIONS.CLOSE_MODALS }
  | { type: typeof COMMENT_ACTIONS.OPEN_CREATE_MODAL }
  | { type: typeof COMMENT_ACTIONS.OPEN_EDIT_MODAL; payload: string }
  | { type: typeof COMMENT_ACTIONS.OPEN_DELETE_MODAL; payload: string };

export interface CommentState {
  processingId: string | null;
  isCreateModalOpen: boolean;
  editModalId: string | null;
  deleteModalId: string | null;
}
