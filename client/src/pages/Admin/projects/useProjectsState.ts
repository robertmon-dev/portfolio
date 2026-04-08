import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { useProjectMutations } from "../useMutations";
import { useProjectsActions } from "./useProjectActions";
import {
  PROJECT_ACTIONS,
  projectReducer,
  initialState,
  type ProjectModalType,
} from "./types";
import type { CreateProjectInput, UpdateProjectInput } from "@portfolio/shared";

export const useProjectsState = () => {
  const utils = trpc.useUtils();
  const mutations = useProjectMutations();
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const handlers = useProjectsActions(mutations, utils, dispatch);

  const { data: projects = [], isLoading: isProjectsLoading } =
    trpc.projects.list.useQuery({});

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === state.selectedId) || null,
    [projects, state.selectedId],
  );

  return {
    state: {
      ...state,
      projects,
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

      createProject: (data: CreateProjectInput) => handlers.handleCreate(data),

      updateProject: (data: UpdateProjectInput) => handlers.handleUpdate(data),

      deleteProject: (id: string) => handlers.handleDelete(id),

      restoreProject: (id: string) => handlers.handleRestore(id),
    },
  };
};
