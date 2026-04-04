import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GithubUpdateForm } from "./Forms/Update";
import { GithubLinkForm } from "./Forms/Link";
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
      link: {
        title: t("admin.github.modals.link.title", {
          name: selectedRepo.name,
          defaultValue: "Link repository",
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
    };

    return contentMap[activeModal as keyof typeof contentMap] || null;
  }, [activeModal, selectedRepo, isAnyProcessing, actions, t, state.projects]);
};
