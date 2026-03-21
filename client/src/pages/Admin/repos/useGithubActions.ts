import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { useGithubMutations } from "../useMutations";
import * as handlers from "./actions";
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
  ProjectWithRelations,
} from "@portfolio/shared";

export const useGithubActions = () => {
  const utils = trpc.useUtils();
  const mutations = useGithubMutations();
  const [state, dispatch] = useReducer(githubReducer, initialState);

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
      projects: projects as ProjectWithRelations[],
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

      updateRepo: (id: string, data: UpdateGithubRepoInput) =>
        handlers.handleUpdate(mutations, utils, dispatch, id, data),

      linkToProject: (input: LinkRepoProjectInput) =>
        handlers.handleLinkProject(mutations, utils, dispatch, input),

      unlinkFromProject: (repoId: string) =>
        handlers.handleUnlinkProject(mutations, utils, dispatch, repoId),

      deleteRepo: (id: string) =>
        handlers.handleDelete(mutations, utils, dispatch, id),
    },
  };
};
