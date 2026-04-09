import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { USER_ACTIONS, type UserAction } from "./types";
import type { Utils } from "@/lib/trpc/types";
import type {
  CreateUserInput,
  UpdateUserInput,
  UpdateUserPermissionsInput,
} from "@portfolio/shared";
import type { UserMutations } from "../useMutations";

export const useUserActions = (
  mutations: UserMutations,
  utils: Utils,
  dispatch: React.Dispatch<UserAction>,
) => {
  const { t } = useTranslation();

  const handleCreate = async (data: CreateUserInput) => {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: "creating" });
    try {
      await mutations.create.mutateAsync(data);
      toast.success(
        t(
          "admin.users.notifications.create.success",
          "User created successfully",
        ),
      );
      dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
      await utils.admin.users.list.invalidate();
    } finally {
      dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdate = async (data: UpdateUserInput) => {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      await mutations.update.mutateAsync(data);
      toast.success(
        t(
          "admin.users.notifications.update.success",
          "User updated successfully",
        ),
      );
      dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
      await utils.admin.users.list.invalidate();
    } finally {
      dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.delete.mutateAsync({ id });
      toast.success(
        t(
          "admin.users.notifications.delete.success",
          "User deleted successfully",
        ),
      );
      dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
      await utils.admin.users.list.invalidate();
    } finally {
      dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdatePermissions = async (data: UpdateUserPermissionsInput) => {
    dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      await mutations.updatePermissions.mutateAsync(data);
      toast.success(
        t(
          "admin.users.notifications.permissions.success",
          "User permissions updated successfully",
        ),
      );
      dispatch({ type: USER_ACTIONS.CLOSE_MODALS });
      await utils.admin.users.list.invalidate();
    } finally {
      dispatch({ type: USER_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleUpdatePermissions,
  };
};
