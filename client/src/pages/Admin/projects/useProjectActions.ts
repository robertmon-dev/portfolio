import { toast } from "react-toastify";
import { PROJECT_ACTIONS, type ProjectAction } from "./types";
import type { ProjectMutations } from "../useMutations";
import type { Utils } from "@/lib/trpc/types";
import type { CreateProjectInput, UpdateProjectInput } from "@portfolio/shared";
import { useTranslation } from "react-i18next";

export const useProjectsActions = (
  mutations: ProjectMutations,
  utils: Utils,
  dispatch: React.Dispatch<ProjectAction>,
) => {
  const { t } = useTranslation();

  const handleCreate = async (data: CreateProjectInput) => {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: "creating" });
    try {
      await mutations.create.mutateAsync(data);
      toast.success(
        t("projects.create.success", "Project created successfully"),
      );

      dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });
      await utils.projects.list.invalidate();
    } finally {
      dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdate = async (data: UpdateProjectInput) => {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      await mutations.update.mutateAsync({ ...data });
      toast.success(
        t("projects.update.success", "Project updated successfully"),
      );

      dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: null });
      dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });

      await utils.projects.list.invalidate();
    } finally {
      dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.delete.mutateAsync({ id });
      toast.success(t("projects.delete.success", "Project moved to trash"));

      dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: null });
      dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });

      await utils.projects.list.invalidate();
    } finally {
      dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleRestore = async (id: string) => {
    dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.update.mutateAsync({ id, isVisible: false });
      toast.success(
        t(
          "projects.restore.success",
          "Project restored successfully. Status set to Draft.",
        ),
      );

      dispatch({ type: PROJECT_ACTIONS.SELECT_PROJECT, payload: null });
      dispatch({ type: PROJECT_ACTIONS.CLOSE_MODALS });

      await utils.projects.list.invalidate();
    } finally {
      dispatch({ type: PROJECT_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleCreate,
    handleRestore,
    handleDelete,
    handleUpdate,
  };
};
