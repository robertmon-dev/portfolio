import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useUserActions } from "./useUserActions";
import { getUserColumns } from "./components/getUserColumns";
import { Button } from "@/components/atoms/Button/Button";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { Users, UserPlus } from "lucide-react";
import "./Users.scss";

export const UsersAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useUserActions();

  const columns = useMemo(
    () =>
      getUserColumns(
        (user) => actions.openModal("UPDATE", user.id),
        (id) => actions.openModal("DELETE", id),
        state.processingId,
      ),
    [actions, state.processingId],
  );

  return (
    <div className="projects-management">
      <Header
        title="User Management"
        subtitle="Manage administrative and guest users"
        action={
          <Button
            onClick={() => actions.openModal("CREATE")}
            variant="primary"
            size="sm"
          >
            <UserPlus size={16} />
            Add User
          </Button>
        }
      />

      <div className="projects-management__loader-container">
        <LoadingBar isLoading={state.isLoading} variant="primary" fullWidth />
      </div>

      <main className="projects-management__content">
        <EntityTable
          data={state.users}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(user) => actions.selectUser(user.id)}
        />
      </main>
    </div>
  );
};
