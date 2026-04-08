import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { useExperienceMutations } from "../useMutations";
import { useExperienceActions } from "./useExperienceActions";
import {
  EXPERIENCE_ACTIONS,
  experienceReducer,
  initialState,
  type ExperienceModalType,
} from "./types";
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@portfolio/shared";

export const useExperienceState = () => {
  const utils = trpc.useUtils();
  const mutations = useExperienceMutations();
  const [state, dispatch] = useReducer(experienceReducer, initialState);
  const handlers = useExperienceActions(mutations, utils, dispatch);

  const { data: experiences = [], isLoading: isExperiencesLoading } =
    trpc.experience.list.useQuery(undefined);

  const selectedExperience = useMemo(
    () => experiences.find((e) => e.id === state.selectedId) || null,
    [experiences, state.selectedId],
  );

  return {
    state: {
      ...state,
      experiences,
      selectedExperience,
      isLoading: isExperiencesLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions: {
      selectExperience: (id: string | null) =>
        dispatch({ type: EXPERIENCE_ACTIONS.SELECT_EXPERIENCE, payload: id }),

      openModal: (type: ExperienceModalType, id?: string) => {
        if (id) {
          dispatch({ type: EXPERIENCE_ACTIONS.SELECT_EXPERIENCE, payload: id });
        }
        dispatch({ type: EXPERIENCE_ACTIONS.OPEN_MODAL, payload: type });
      },

      closeModals: () => dispatch({ type: EXPERIENCE_ACTIONS.CLOSE_MODALS }),

      createExperience: (data: CreateExperienceInput) =>
        handlers.handleCreate(data),

      updateExperience: (data: UpdateExperienceInput) =>
        handlers.handleUpdate(data),

      deleteExperience: (id: string) => handlers.handleDelete([id]),
    },
  };
};

export type ExperienceActions = ReturnType<typeof useExperienceActions>;
