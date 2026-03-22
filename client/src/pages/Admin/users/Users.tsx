import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useUsersActions } from "./useUsersActions";
import { getUsersColumns } from "./components/getUserColumns";
import { Button } from "@/components/atoms/Button/Button";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { Users, UserPlus, ShieldCheck } from "lucide-react";
import { UsersModals } from "@/components/molecules/Modals/User/Modal";
import "./Users.scss";

export const UsersAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useUsersActions();

  const headerTags = useMemo(() => {
    const admins = state.users.filter((u) => u.role === "ADMIN").length;

    return [
      {
        id: "total",
        children: t("admin.users.tags.total", {
          count: state.users.length,
          defaultValue: "{{count}} Users",
        }),
        variant: "info" as const,
        icon: <Users size={12} />,
      },
      {
        id: "admins",
        children: t("admin.users.tags.admins", {
          count: admins,
          defaultValue: "{{count}} Admins",
        }),
        variant: "warning" as const,
        icon: <ShieldCheck size={12} />,
      },
    ];
  }, [state.users, t]);

  const columns = useMemo(
    () =>
      getUsersColumns(
        (user) => actions.openModal("UPDATE", user.id),
        (user) => actions.openModal("PERMISSIONS", user.id),
        (id) => actions.openModal("DELETE", id),
        state.processingId,
      ),
    [actions, state.processingId],
  );

  return (
    <div className="users-management">
      <Header
        title={t("admin.users.title", "User Management")}
        subtitle={t(
          "admin.users.subtitle",
          "Manage access levels and profiles",
        )}
        tags={headerTags}
        action={
          <Button
            onClick={() => actions.openModal("CREATE")}
            variant="primary"
            size="sm"
          >
            <UserPlus size={16} />
            {t("admin.users.actions.add", "Add User")}
          </Button>
        }
      />

      <div className="users-management__loader-container">
        <LoadingBar isLoading={state.isLoading} variant="primary" fullWidth />
      </div>

      <main className="users-management__content">
        <EntityTable
          data={state.users}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(user) => actions.selectUser(user.id)}
        />
      </main>

      <UsersModals state={state} actions={actions} />
    </div>
  );
};
