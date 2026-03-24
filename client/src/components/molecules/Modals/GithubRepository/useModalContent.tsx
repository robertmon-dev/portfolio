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
      update: {
        title: t("admin.github.modals.update.title", {
          name: selectedRepo.name,
        }),
        component: (
          <GithubUpdateForm
            repo={selectedRepo}
            onSubmit={(data) => actions.updateRepo(data)}
            isLoading={isAnyProcessing}
          />
        ),
      },
      link: {
        title: t("admin.github.modals.link.title"),
        component: (
          <GithubLinkForm
            repo={selectedRepo}
            projects={state.projects}
            onSubmit={(data) => actions.linkToProject(data)}
            isLoading={isAnyProcessing}
          />
        ),
      },
      delete: {
        title: t("admin.github.modals.delete.title"),
        component: (
          <ConfirmDialog
            message={t("admin.github.modals.delete.message", {
              name: selectedRepo.name,
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

    return contentMap[activeModal as keyof typeof contentMap] || null;
  }, [activeModal, selectedRepo, isAnyProcessing, actions, t, state.projects]);
};
