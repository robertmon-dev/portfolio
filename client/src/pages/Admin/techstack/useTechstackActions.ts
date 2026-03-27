import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { useTechStackMutations } from "../useMutations";
import * as handlers from "./actions";
import {
  TECH_STACK_ACTIONS,
  techStackReducer,
  initialState,
  type TechStackModalType,
} from "./types";
import type {
  CreateTechStackInput,
  UpdateTechStackInput,
  LinkTechStackProjectInput,
  UnlinkTechStackProjectInput,
} from "@portfolio/shared";

export const useTechStackActions = () => {
  const utils = trpc.useUtils();
  const mutations = useTechStackMutations();
  const [state, dispatch] = useReducer(techStackReducer, initialState);

  const { data: techStacks = [], isLoading: isTechStacksLoading } =
    trpc.techStack.list.useQuery();

  const selectedTechStack = useMemo(
    () => techStacks.find((ts) => ts.id === state.selectedId) || null,
    [techStacks, state.selectedId],
  );

  const actions = useMemo(
    () => ({
      selectTechStack: (id: string | null) =>
        dispatch({ type: TECH_STACK_ACTIONS.SELECT_TECH_STACK, payload: id }),

      openModal: (type: TechStackModalType, id?: string) => {
        if (id) {
          dispatch({ type: TECH_STACK_ACTIONS.SELECT_TECH_STACK, payload: id });
        }
        dispatch({ type: TECH_STACK_ACTIONS.OPEN_MODAL, payload: type });
      },

      closeModals: () => dispatch({ type: TECH_STACK_ACTIONS.CLOSE_MODALS }),

      createTechStack: (data: CreateTechStackInput) =>
        handlers.handleCreate(mutations, utils, dispatch, data),

      updateTechStack: (data: UpdateTechStackInput) =>
        handlers.handleUpdate(mutations, utils, dispatch, data),

      deleteTechStack: (id: string) =>
        handlers.handleDelete(mutations, utils, dispatch, id),

      linkProject: (data: LinkTechStackProjectInput) =>
        handlers.handleLink(mutations, utils, dispatch, data),

      unlinkProject: (data: UnlinkTechStackProjectInput) =>
        handlers.handleUnlink(mutations, utils, dispatch, data),
    }),
    [mutations, utils],
  );

  return {
    state: {
      ...state,
      techStacks,
      selectedTechStack,
      isLoading: isTechStacksLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions,
  };
};
