import { toast } from "react-toastify";
import { USER_ACTIONS, type UserAction } from "./types";
import type { Utils } from "@/lib/trpc/types";
import type {
  CreateUserInput,
  UpdateUserInput,
  UpdateUserPermissionsInput,
} from "@portfolio/shared";
import type { UserMutations } from "../useMutations";

export const handleCreate = async (
  mutations: UserMutations,
  utils: Utils,
  dispatch: React.Dispatch<UserAction>,
  data: CreateUserInput,
) => {
  dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: "creating" });
  try {
    await mutations.create.mutateAsync(data);
    toast.success("User created successfully");
    dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
    await utils.admin.users.list.invalidate();
  } finally {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleUpdate = async (
  mutations: UserMutations,
  utils: Utils,
  dispatch: React.Dispatch<UserAction>,
  data: UpdateUserInput,
) => {
  dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: data.id });
  try {
    await mutations.update.mutateAsync(data);
    toast.success("User updated successfully");
    dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
    await utils.admin.users.list.invalidate();
  } finally {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleDelete = async (
  mutations: UserMutations,
  utils: Utils,
  dispatch: React.Dispatch<UserAction>,
  id: string,
) => {
  dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: id });
  try {
    await mutations.delete.mutateAsync({ id });
    toast.success("User deleted successfully");
    dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
    await utils.admin.users.list.invalidate();
  } finally {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleUpdatePermissions = async (
  mutations: UserMutations,
  utils: Utils,
  dispatch: React.Dispatch<UserAction>,
  data: UpdateUserPermissionsInput,
) => {
  dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: data.id });
  try {
    await mutations.updatePermissions.mutateAsync(data);
    toast.success("User permissions updated successfully");
    dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
    await utils.admin.users.list.invalidate();
  } finally {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
  }
};
