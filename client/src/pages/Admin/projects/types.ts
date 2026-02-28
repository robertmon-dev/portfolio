export const PROJECT_ACTIONS = {
  SET_PROCESSING: 'PROJECT/SET_PROCESSING',
  SELECT_PROJECT: 'PROJECT/SELECT_PROJECT',
  OPEN_MODAL: 'PROJECT/OPEN_MODAL',
  CLOSE_MODALS: 'PROJECT/CLOSE_MODALS',
} as const;

export type ProjectModalType = 'create' | 'update' | 'delete' | 'restore' | null;

export interface ProjectState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: ProjectModalType;
}

export type ProjectAction =
  | { type: typeof PROJECT_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof PROJECT_ACTIONS.SELECT_PROJECT; payload: string | null }
  | { type: typeof PROJECT_ACTIONS.OPEN_MODAL; payload: ProjectModalType }
  | { type: typeof PROJECT_ACTIONS.CLOSE_MODALS };

export const initialState: ProjectState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case PROJECT_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };
    case PROJECT_ACTIONS.SELECT_PROJECT:
      return { ...state, selectedId: action.payload };
    case PROJECT_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };
    case PROJECT_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}
