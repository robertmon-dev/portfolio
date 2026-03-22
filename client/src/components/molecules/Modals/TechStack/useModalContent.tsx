import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TechStackForm } from "./Forms/Main";
import { LinkTechStackForm } from "./Forms/Link";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";
import { useProjectActions } from "@/pages/Admin/projects/useProjectActions";
import type { TechStackActions } from "@/pages/Admin/techstack/types";

export const useModalContent = (
  state: TechStackActions["state"],
  actions: TechStackActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedTechStack, isAnyProcessing } = state;

  const { state: projectState } = useProjectActions();
  const projects = projectState.projects;

  return useMemo(() => {
    if (!activeModal) return null;

    const contentMap = {
      CREATE: {
        title: t("admin.techStack.modals.create.title"),
        component: (
          <TechStackForm
            onCreate={actions.createTechStack}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      UPDATE: {
        title: t("admin.techStack.modals.update.title", {
          name: selectedTechStack?.name,
          defaultValue: "Edit: {{name}}",
        }),
        component: selectedTechStack ? (
          <TechStackForm
            initialData={selectedTechStack}
            onUpdate={actions.updateTechStack}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ) : null,
      },
      LINK: {
        title: t("admin.techStack.modals.link.title"),
        component: selectedTechStack ? (
          <LinkTechStackForm
            techStack={selectedTechStack}
            projects={projects}
            onSubmit={(projectId) =>
              actions.linkProject({
                techStackId: selectedTechStack.id,
                projectId,
              })
            }
            onUnlink={(techStackId, projectId) =>
              actions.unlinkProject({ techStackId, projectId })
            }
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing || projectState.isLoading}
          />
        ) : null,
      },
      DELETE: {
        title: t("admin.techStack.modals.delete.title"),
        component: selectedTechStack ? (
          <ConfirmDialog
            message={t("admin.techStack.modals.delete.message", {
              name: selectedTechStack.name,
              defaultValue:
                "Are you sure you want to delete {{name}}? This action cannot be undone.",
            })}
            confirmText={t("common.delete")}
            cancelText={t("common.cancel")}
            onConfirm={() => actions.deleteTechStack(selectedTechStack.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
            variant="danger"
          />
        ) : null,
      },
    };

    return contentMap[activeModal];
  }, [
    activeModal,
    selectedTechStack,
    isAnyProcessing,
    actions,
    t,
    projects,
    projectState.isLoading,
  ]);
};
