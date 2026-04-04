import { useGithubActions } from "./useGithubActions";

export const GITHUB_ACTIONS = {
  SET_PROCESSING: "GITHUB/SET_PROCESSING",
  SELECT_REPO: "GITHUB/SELECT_REPO",
  OPEN_MODAL: "GITHUB/OPEN_MODAL",
  CLOSE_MODALS: "GITHUB/CLOSE_MODALS",
} as const;

export type GithubModalType = "UPDATE" | "LINK" | "DELETE" | null;

export interface GithubState {
  processingId: string | null;
  selectedId: string | null;
  activeModal: GithubModalType;
}

export type GithubAction =
  | { type: typeof GITHUB_ACTIONS.SET_PROCESSING; payload: string | null }
  | { type: typeof GITHUB_ACTIONS.SELECT_REPO; payload: string | null }
  | { type: typeof GITHUB_ACTIONS.OPEN_MODAL; payload: GithubModalType }
  | { type: typeof GITHUB_ACTIONS.CLOSE_MODALS };

export const initialState: GithubState = {
  processingId: null,
  selectedId: null,
  activeModal: null,
};

export function githubReducer(
  state: GithubState,
  action: GithubAction,
): GithubState {
  switch (action.type) {
    case GITHUB_ACTIONS.SET_PROCESSING:
      return { ...state, processingId: action.payload };
    case GITHUB_ACTIONS.SELECT_REPO:
      return { ...state, selectedId: action.payload };
    case GITHUB_ACTIONS.OPEN_MODAL:
      return { ...state, activeModal: action.payload };
    case GITHUB_ACTIONS.CLOSE_MODALS:
      return { ...state, activeModal: null };
    default:
      return state;
  }
}

export type GithubActions = ReturnType<typeof useGithubActions>;
