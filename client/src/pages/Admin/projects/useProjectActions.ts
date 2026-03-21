import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { useProjectMutations } from "../useMutations";
import * as handlers from "./actions";
import {
  PROJECT_ACTIONS,
  projectReducer,
  initialState,
  type ProjectModalType,
} from "./types";
import type {
  ProjectWithRelations,
  CreateProjectInput,
  UpdateProjectInput,
} from "@portfolio/shared";

export const useProjectActions = () => {
  const utils = trpc.useUtils();
  const mutations = useProjectMutations();
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const { data: projects = [], isLoading: isProjectsLoading } =
    trpc.projects.list.useQuery({});

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === state.selectedId) || null,
    [projects, state.selectedId],
  );

  return {
    state: {
      ...state,
      projects: projects as ProjectWithRelations[],
      selectedProject,
      isLoading: isProjectsLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions: {
      selectProject: (id: string | null) =>
        dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: id }),

      openModal: (type: ProjectModalType, id?: string) => {
        if (id) {
          dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: id });
        }
        dispatch({ type: PROJECT_ACTIONS.OPEN_MODAL, payload: type });
      },

      closeModals: () => dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS }),

      createProject: (data: CreateProjectInput) =>
        handlers.handleCreate(mutations, utils, dispatch, data),

      updateProject: (data: UpdateProjectInput) =>
        handlers.handleUpdate(mutations, utils, dispatch, data),

      deleteProject: (id: string) =>
        handlers.handleDelete(mutations, utils, dispatch, id),

      restoreProject: (id: string) =>
        handlers.handleRestore(mutations, utils, dispatch, id),
    },
  };
};
