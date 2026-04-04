import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GithubUpdateForm } from "./Forms/Update";
import { GithubLinkForm } from "./Forms/Link";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";
import type { GithubActions } from "@/pages/Admin/repos/types";

export const useModalContent = (
  state: GithubActions["state"],
  actions: GithubActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedRepo, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal || !selectedRepo) return null;

    const contentMap = {
      UPDATE: {
        title: t("admin.github.modals.update.title", {
          name: selectedRepo.name,
          defaultValue: "Update Repository",
        }),
        component: (
          <GithubUpdateForm
            repo={selectedRepo}
            onSubmit={(data) => actions.updateRepo(data)}
            isLoading={isAnyProcessing}
          />
        ),
      },
      LINK: {
        title: t("admin.github.modals.link.title", {
          name: selectedRepo.name,
          defaultValue: "Link repository with project",
        }),
        component: (
          <GithubLinkForm
            repo={selectedRepo}
            projects={state.projects}
            onSubmit={(data) => actions.linkToProject(data)}
            isLoading={isAnyProcessing}
          />
        ),
      },
      DELETE: {
        title: t("admin.github.modals.delete.title", {
          name: selectedRepo.name,
          defaultValue: "Remove repository",
        }),
        component: (
          <ConfirmDialog
            message={t("admin.github.modals.delete.message", {
              name: selectedRepo.name,
              defaultValue: "Are you willing to remove this repository?",
            })}
            confirmText={t("common.delete", "Delete")}
            cancelText={t("common.cancel", "Cancel")}
            onConfirm={() => actions.deleteRepo(selectedRepo.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
            variant="danger"
          />
        ),
      },
    };

    return contentMap[activeModal] || null;
  }, [activeModal, selectedRepo, isAnyProcessing, actions, t, state.projects]);
};
