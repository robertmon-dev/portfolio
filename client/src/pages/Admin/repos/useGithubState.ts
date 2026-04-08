import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { useGithubMutations } from "../useMutations";
import { useGithubActions } from "./useGithubActions";
import {
  GITHUB_ACTIONS,
  githubReducer,
  initialState,
  type GithubModalType,
} from "./types";
import type {
  UpdateGithubRepoInput,
  LinkRepoProjectInput,
  GithubRepo,
} from "@portfolio/shared";

export const useGithubState = () => {
  const utils = trpc.useUtils();
  const mutations = useGithubMutations();
  const [state, dispatch] = useReducer(githubReducer, initialState);
  const handlers = useGithubActions(mutations, utils, dispatch);

  const { data: repos = [], isLoading: isReposLoading } =
    trpc.githubRepo.listRepos.useQuery();
  const { data: projects = [], isLoading: isProjectsLoading } =
    trpc.projects.list.useQuery({});
  const { data: stats = null, isLoading: isStatsLoading } =
    trpc.githubStats.getStats.useQuery();

  const selectedRepo = useMemo(
    () => repos.find((r: GithubRepo) => r.id === state.selectedId) || null,
    [repos, state.selectedId],
  );

  return {
    state: {
      ...state,
      repos,
      projects,
      stats,
      selectedRepo,
      isLoading: isReposLoading || isStatsLoading || isProjectsLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions: {
      selectRepo: (id: string | null) =>
        dispatch({ type: GITHUB_ACTIONS.SELECT_REPO, payload: id }),

      openModal: (type: GithubModalType, id?: string) => {
        if (id) {
          dispatch({ type: GITHUB_ACTIONS.SELECT_REPO, payload: id });
        }

        dispatch({ type: GITHUB_ACTIONS.OPEN_MODAL, payload: type });
      },

      closeModals: () => dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS }),

      updateRepo: (data: UpdateGithubRepoInput) => handlers.handleUpdate(data),

      linkToProject: (data: LinkRepoProjectInput) =>
        handlers.handleLinkProject(data),

      unlinkFromProject: (repoId: string) =>
        handlers.handleUnlinkProject(repoId),

      deleteRepo: (repoId: string) => handlers.handleDelete(repoId),
    },
  };
};
