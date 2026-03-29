import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CreateUserForm } from "./Forms/Create";
import { UpdateUserForm } from "./Forms/Update";
import { UpdatePermissionsForm } from "./Forms/UpdatePermission";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";
import type { UserActions } from "@/pages/Admin/users/types";

export const useModalContent = (
  state: UserActions["state"],
  actions: UserActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedUser, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal) return null;

    const contentMap = {
      CREATE: {
        title: t("admin.users.modals.create.title", "Create New User"),
        component: (
          <CreateUserForm
            onSubmit={actions.createUser}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      UPDATE: {
        title: t("admin.users.modals.update.title", {
          name: selectedUser?.username,
          defaultValue: "Edit User: @{{name}}",
        }),
        component: selectedUser ? (
          <UpdateUserForm
            initialData={selectedUser}
            onSubmit={(data) => actions.updateUser({ ...data })}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ) : null,
      },
      PERMISSIONS: {
        title: t("admin.users.modals.permissions.title", {
          name: selectedUser?.username,
          defaultValue: "Permissions: @{{name}}",
        }),
        component: selectedUser ? (
          <UpdatePermissionsForm
            initialData={selectedUser}
            onSubmit={(data) => actions.updatePermissions(data)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ) : null,
      },
      DELETE: {
        title: t("admin.users.modals.delete.title", {
          name: selectedUser?.username,
          defaultValue: "Remove user: @{{name}}",
        }),
        component: selectedUser ? (
          <ConfirmDialog
            message={t("admin.users.modals.delete.message", {
              name: selectedUser.username,
              defaultValue:
                "Are you sure you want to delete @{{name}}? This action cannot be undone.",
            })}
            confirmText={t("common.delete")}
            cancelText={t("common.cancel")}
            onConfirm={() => actions.deleteUser(selectedUser.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
            variant="danger"
          />
        ) : null,
      },
    };

    return contentMap[activeModal];
  }, [activeModal, selectedUser, isAnyProcessing, actions, t]);
};
