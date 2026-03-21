import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTechStackActions } from "./useTechstackActions";
import { getTechStackColumns } from "./components/getTechstackColumns";
import { Button } from "@/components/atoms/Button/Button";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { TechStackModals } from "@/components/molecules/Modals/TechStack/Modal";
import { Plus, Layers } from "lucide-react";

export const TechStackAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useTechStackActions();

  const headerTags = useMemo(() => {
    const total = state.techStacks.length;

    return [
      {
        id: "total",
        children: t("admin.techStack.tags.total", { count: total, defaultValue: "{{count}} Technologies" }),
        variant: "info" as const,
        icon: <Layers size={12} />
      }
    ];
  }, [state.techStacks, t]);

  const columns = useMemo(() => getTechStackColumns(
    (techStack) => actions.openModal('UPDATE', techStack.id),
    (id) => actions.openModal('DELETE', id),
    state.processingId,
  ), [actions, state.processingId]);

  return (
    <div className="projects-management">
      <Header
        title={t("admin.techStack.title", "Tech Stack")}
        subtitle={t("admin.techStack.subtitle", "Manage your technologies and tools")}
        tags={headerTags}
        action={
          <Button onClick={() => actions.openModal('CREATE')} variant="primary" size="sm">
            <Plus size={16} />
            {t("admin.techStack.actions.add", "Add Technology")}
          </Button>
        }
      />

      <div className="projects-management__loader-container">
        <LoadingBar
          isLoading={state.isLoading}
          variant="primary"
          fullWidth
        />
      </div>

      <main className="projects-management__content">
        <EntityTable
          data={state.techStacks}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(techStack) => actions.selectTechStack(techStack.id)}
        />
      </main>

      <TechStackModals state={state} actions={actions} />
    </div>
  );
};
