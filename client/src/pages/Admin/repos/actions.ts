import { toast } from "react-toastify";
import { notifyError } from "@/lib/trpc/handlers/trpcError";
import { GITHUB_ACTIONS } from "./types";
import type { GithubMutations } from "../useMutations";
import type {
  UpdateGithubRepoInput,
  LinkRepoProjectInput,
} from "@portfolio/shared";
import type { Utils } from "@/lib/trpc/types";
import type { GithubAction } from "./types";

export const handleUpdate = async (
  mutations: GithubMutations,
  utils: Utils,
  dispatch: React.Dispatch<GithubAction>,
  input: UpdateGithubRepoInput,
) => {
  dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: input.id });

  try {
    await mutations.update.mutateAsync(input);

    toast.success("Repo updated successfully");
    dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

    await Promise.all([
      utils.githubStats.getStats.invalidate(),
      utils.githubRepo.listRepos.invalidate(),
    ]);
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleLinkProject = async (
  mutations: GithubMutations,
  utils: Utils,
  dispatch: React.Dispatch<GithubAction>,
  input: LinkRepoProjectInput,
) => {
  dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: input.repoId });
  try {
    await mutations.linkProject.mutateAsync(input);
    toast.success("Project linked successfully");
    dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

    await Promise.all([
      utils.githubRepo.listRepos.invalidate(),
      utils.githubStats.getStats.invalidate(),
    ]);
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleDelete = async (
  mutations: GithubMutations,
  utils: Utils,
  dispatch: React.Dispatch<GithubAction>,
  id: string,
) => {
  dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: id });
  try {
    await mutations.delete.mutateAsync({ id });
    toast.success("Repo removed from database");

    dispatch({ type: GITHUB_ACTIONS.SELECT_REPO, payload: null });
    dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

    await Promise.all([
      utils.githubStats.getStats.invalidate(),
      utils.githubRepo.listRepos.invalidate(),
    ]);
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleUnlinkProject = async (
  mutations: GithubMutations,
  utils: Utils,
  dispatch: React.Dispatch<GithubAction>,
  repoId: string,
) => {
  dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: repoId });
  try {
    await mutations.unlinkProject.mutateAsync({ repoId });
    toast.success("Project unlinked successfully");

    dispatch({ type: GITHUB_ACTIONS.SELECT_REPO, payload: null });
    dispatch({ type: GITHUB_ACTIONS.CLOSE_MODALS });

    await Promise.all([
      utils.githubRepo.listRepos.invalidate(),
      utils.githubStats.getStats.invalidate(),
    ]);
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: GITHUB_ACTIONS.SET_PROCESSING, payload: null });
  }
};
