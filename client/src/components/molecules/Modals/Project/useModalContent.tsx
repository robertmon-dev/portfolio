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
        title: t("admin.projects.modals.create.title", "Edit exisitng project"),
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
              defaultValue: "Czy na pewno chcesz usunąć ten projekt?",
            })}
            confirmText={t("common.delete", "Usuń")}
            variant="danger"
            onConfirm={() => actions.deleteProject(selectedProject!.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      RESTORE: {
        title: t("admin.projects.modals.restore.title", "Restore project"),
        component: (
          <ConfirmDialog
            message={t(
              "admin.projects.modals.restore.confirm",
              "You sure about restoring this project?",
            )}
            confirmText={t("common.restore", "Restore")}
            variant="success"
            onConfirm={() => actions.restoreProject(selectedProject!.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
    };

    return contentMap[activeModal];
  }, [activeModal, selectedProject, isAnyProcessing, actions, t]);
};
