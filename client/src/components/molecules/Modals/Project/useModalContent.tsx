import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ProjectForm } from "./Forms/Main";
import type { ProjectActions } from "@/pages/Admin/projects/types";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export const useProjectModalContent = (
  state: ProjectActions["state"],
  actions: ProjectActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedProject, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal) return null;

    const contentMap = {
      CREATE: {
        title: t("admin.projects.modals.create.title", "Edit existing project"),
        component: (
          <ProjectForm
            onSubmit={(data) => actions.createProject(data)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      UPDATE: {
        title: t("admin.projects.modals.edit.title", "Edit project"),
        component: (
          <ProjectForm
            initialData={selectedProject}
            onSubmit={(data) =>
              actions.updateProject({ id: selectedProject!.id, ...data })
            }
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      DELETE: {
        title: t("admin.projects.modals.delete.title", "Remove project"),
        component: (
          <ConfirmDialog
            message={t("admin.projects.modals.delete.confirm", {
              title: selectedProject?.title,
              defaultValue: "Are you sure about that?",
            })}
            confirmText={t("common.delete", "Remove")}
            variant="danger"
            onConfirm={() => actions.deleteProject(selectedProject!.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
    };

    return contentMap[activeModal];
  }, [activeModal, selectedProject, isAnyProcessing, actions, t]);
};
