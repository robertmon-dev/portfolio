import { useTechStackActions } from "./useTechstackActions";

export const TECH_STACK_ACTIONS = {
  SET_PROCESSING: "TECH_STACK/SET_PROCESSING",
  SELECT_TECH_STACK: "TECH_STACK/SELECT_TECH_STACK",
  OPEN_MODAL: "TECH_STACK/OPEN_MODAL",
  CLOSE_MODALS: "TECH_STACK/CLOSE_MODALS",
} as const;

export type TechStackModalType = "CREATE" | "UPDATE" | "DELETE" | null;

export interface TechStackState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: TechStackModalType;
}

export type TechStackAction =
  | { type: typeof TECH_STACK_ACTIONS.SET_PROCESSING; payload: string | null }
  | {
      type: typeof TECH_STACK_ACTIONS.SELECT_TECH_STACK;
      payload: string | null;
    }
  | { type: typeof TECH_STACK_ACTIONS.OPEN_MODAL; payload: TechStackModalType }
  | { type: typeof TECH_STACK_ACTIONS.CLOSE_MODALS };

export const initialState: TechStackState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export function techStackReducer(
  state: TechStackState,
  action: TechStackAction,
): TechStackState {
  switch (action.type) {
    case TECH_STACK_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };
    case TECH_STACK_ACTIONS.SELECT_TECH_STACK:
      return { ...state, selectedId: action.payload };
    case TECH_STACK_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };
    case TECH_STACK_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}

export type TechStackActions = ReturnType<typeof useTechStackActions>;
