import { useReducer, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { useUserMutations } from "../useMutations";
import { useUserActions } from "./useUserActions";
import {
  USER_ACTIONS,
  userReducer,
  initialState,
  type UserModalType,
} from "./types";
import type {
  CreateUserInput,
  UpdateUserInput,
  UpdateUserPermissionsInput,
} from "@portfolio/shared";

export const useUsersState = () => {
  const utils = trpc.useUtils();
  const mutations = useUserMutations();
  const [state, dispatch] = useReducer(userReducer, initialState);
  const handlers = useUserActions(mutations, utils, dispatch);

  const { data: users = [], isLoading } = trpc.admin.users.list.useQuery();

  const selectedUser = useMemo(
    () => users.find((u) => u.id === state.selectedId) || null,
    [users, state.selectedId],
  );

  const actions = useMemo(
    () => ({
      selectUser: (id: string | null) =>
        dispatch({ type: USER_ACTIONS.SELECT_USER, payload: id }),

      openModal: (type: UserModalType, id?: string) => {
        if (id) dispatch({ type: USER_ACTIONS.SELECT_USER, payload: id });
        dispatch({ type: USER_ACTIONS.OPEN_MODAL, payload: type });
      },

      closeModals: () => dispatch({ type: USER_ACTIONS.CLOSE_MODALS }),
      createUser: (data: CreateUserInput) => handlers.handleCreate(data),
      updateUser: (data: UpdateUserInput) => handlers.handleUpdate(data),
      deleteUser: (id: string) => handlers.handleDelete(id),

      updatePermissions: (data: UpdateUserPermissionsInput) =>
        handlers.handleUpdatePermissions(data),
    }),
    [mutations, utils],
  );

  return {
    state: {
      ...state,
      users,
      selectedUser,
      isLoading,
      isAnyProcessing: !!state.processingId,
    },
    actions,
  };
};
