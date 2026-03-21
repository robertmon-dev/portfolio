import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProjectActions } from "./useProjectActions";
import { getProjectColumns } from "./components/getProjectColumns";
import { Button } from "@/components/atoms/Button/Button";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { ProjectsModals } from "@/components/molecules/Modals/Project/Modal";
import { Star, Eye, Code2, Plus } from "lucide-react";
import "./Projects.scss";

export const ProjectsAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useProjectActions();

  const headerTags = useMemo(() => {
    const total = state.projects.length;
    const featured = state.projects.filter(p => p.isFeatured).length;
    const visible = state.projects.filter(p => p.isVisible).length;

    return [
      {
        id: "total",
        children: t("admin.projects.tags.total", { count: total, defaultValue: "{{count}} Projects" }),
        variant: "info" as const,
        icon: <Code2 size={12} />
      },
      {
        id: "visible",
        children: t("admin.projects.tags.visible", { count: visible, defaultValue: "{{count}} Visible" }),
        variant: "success" as const,
        icon: <Eye size={12} />
      },
      {
        id: "featured",
        children: t("admin.projects.tags.featured", { count: featured, defaultValue: "{{count}} Featured" }),
        variant: "warning" as const,
        icon: <Star size={12} />
      }
    ];
  }, [state.projects, t]);

  const columns = getProjectColumns(
    (project) => actions.openModal('UPDATE', project.id),
    (id) => actions.deleteProject(id),
    state.processingId,
  );

  return (
    <div className="projects-management">
      <Header
        title={t("admin.projects.title")}
        subtitle={t("admin.projects.subtitle")}
        tags={headerTags}
        action={
          <Button onClick={() => actions.openModal('CREATE')} variant="primary" size="sm">
            <Plus size={16} />
            {t("admin.projects.actions.add")}
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
          data={state.projects}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(project) => actions.selectProject(project.id)}
        />
      </main>

      <ProjectsModals state={state} actions={actions} />
    </div>
  );
};
