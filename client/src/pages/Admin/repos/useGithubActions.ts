import { toast } from "react-toastify";
import { GITHUB_ACTIONS } from "./types";
import type { GithubMutations } from "../useMutations";
import type {
  UpdateGithubRepoInput,
  LinkRepoProjectInput,
} from "@portfolio/shared";
import type { Utils } from "@/lib/trpc/types";
import type { GithubAction } from "./types";
import { useTranslation } from "react-i18next";

export const useGithubActions = (
  mutations: GithubMutations,
  utils: Utils,
  dispatch: React.Dispatch<GithubAction>,
) => {
  const { t } = useTranslation();

  const handleUpdate = async (input: UpdateGithubRepoInput) => {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: input.id });

    try {
      await mutations.update.mutateAsync(input);

      toast.success(
        t("admin.github.notifications.update.success", {
          defaultValue: "Repo updated successfully",
        }),
      );

      dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

      await Promise.all([
        utils.githubStats.getStats.invalidate(),
        utils.githubRepo.listRepos.invalidate(),
      ]);
    } finally {
      dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleLinkProject = async (input: LinkRepoProjectInput) => {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: input.repoId });
    try {
      await mutations.linkProject.mutateAsync(input);

      toast.success(
        t("admin.github.notifications.link.success", {
          defaultValue: "Project linked successfully",
        }),
      );

      dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

      await Promise.all([
        utils.githubRepo.listRepos.invalidate(),
        utils.githubStats.getStats.invalidate(),
      ]);
    } finally {
      dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.delete.mutateAsync({ id });

      toast.success(
        t("admin.github.notifications.delete.success", {
          defaultValue: "Repo removed from database",
        }),
      );

      dispatch({ type: GITHUB_ACTIONS.SELECT_REPO, payload: null });
      dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

      await Promise.all([
        utils.githubStats.getStats.invalidate(),
        utils.githubRepo.listRepos.invalidate(),
      ]);
    } finally {
      dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUnlinkProject = async (repoId: string) => {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: repoId });
    try {
      await mutations.unlinkProject.mutateAsync({ repoId });

      toast.success(
        t("admin.github.notifications.unlink.success", {
          defaultValue: "Project unlinked successfully",
        }),
      );

      dispatch({ type: GITHUB_ACTIONS.SELECT_REPO, payload: null });
      dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

      await Promise.all([
        utils.githubRepo.listRepos.invalidate(),
        utils.githubStats.getStats.invalidate(),
        utils.projects.list.invalidate(),
      ]);
    } finally {
      dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleDelete,
    handleUpdate,
    handleLinkProject,
    handleUnlinkProject,
  };
};
