export const EXPERIENCE_ACTIONS = {
  SET_PROCESSING: "EXPERIENCE/SET_PROCESSING",
  SELECT_EXPERIENCE: "EXPERIENCE/SELECT_EXPERIENCE",
  OPEN_MODAL: "EXPERIENCE/OPEN_MODAL",
  CLOSE_MODALS: "EXPERIENCE/CLOSE_MODALS",
} as const;

export type ExperienceModalType = "CREATE" | "UPDATE" | "DELETE" | null;

export interface ExperienceState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: ExperienceModalType;
}

export type ExperienceAction =
  | { type: typeof EXPERIENCE_ACTIONS.SET_PROCESSING; payload: string | null }
  | {
      type: typeof EXPERIENCE_ACTIONS.SELECT_EXPERIENCE;
      payload: string | null;
    }
  | { type: typeof EXPERIENCE_ACTIONS.OPEN_MODAL; payload: ExperienceModalType }
  | { type: typeof EXPERIENCE_ACTIONS.CLOSE_MODALS };

export const initialState: ExperienceState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction,
): ExperienceState {
  switch (action.type) {
    case EXPERIENCE_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };

    case EXPERIENCE_ACTIONS.SELECT_EXPERIENCE:
      return { ...state, selectedId: action.payload };

    case EXPERIENCE_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };

    case EXPERIENCE_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };

    default:
      return state;
  }
}
