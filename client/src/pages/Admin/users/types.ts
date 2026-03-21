import { UserProfile } from "@portfolio/shared";
import { useUsersActions } from "./useUsersActions";

export const USER_ACTIONS = {
  SET_PROCESSING: "USER/SET_PROCESSING",
  SELECT_USER: "USER/SELECT_USER",
  OPEN_MODAL: "USER/OPEN_MODAL",
  CLOSE_MODALS: "USER/CLOSE_MODALS",
} as const;

export type UserModalType = "CREATE" | "UPDATE" | "DELETE" | null;

export interface UserState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: UserModalType;
}

export type UserAction =
  | { type: typeof USER_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof USER_ACTIONS.SELECT_USER; payload: string | null }
  | { type: typeof USER_ACTIONS.OPEN_MODAL; payload: UserModalType }
  | { type: typeof USER_ACTIONS.CLOSE_MODALS };

export const initialState: UserState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case USER_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };
    case USER_ACTIONS.SELECT_USER:
      return { ...state, selectedId: action.payload };
    case USER_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };
    case USER_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}

export type UserActions = ReturnType<typeof useUsersActions>;
