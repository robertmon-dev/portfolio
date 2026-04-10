import { toast } from "react-toastify";
import { TECH_STACK_ACTIONS, type TechStackAction } from "./types";
import type { Utils } from "@/lib/trpc/types";
import type {
  CreateTechStackInput,
  UpdateTechStackInput,
  UnlinkTechStackProjectInput,
  LinkTechStackProjectInput,
} from "@portfolio/shared";
import type { TechStackMutations } from "../useMutations";
import { useTranslation } from "react-i18next";

export const useTechstackActions = (
  mutations: TechStackMutations,
  utils: Utils,
  dispatch: React.Dispatch<TechStackAction>,
) => {
  const { t } = useTranslation();

  const handleCreate = async (data: CreateTechStackInput) => {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: "creating" });
    try {
      await mutations.create.mutateAsync(data);
      toast.success(
        t(
          "techStack.notifications.create.success",
          "Tech Stack created successfully",
        ),
      );

      dispatch({ type: TECH_STACK_ACTIONS.CLOSE_MODALS });
      await utils.techStack.list.invalidate();
    } finally {
      dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdate = async (data: UpdateTechStackInput) => {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      await mutations.update.mutateAsync(data);
      toast.success(
        t(
          "techStack.notifications.update.success",
          "Tech Stack updated successfully",
        ),
      );

      dispatch({ type: TECH_STACK_ACTIONS.SELECT_TECH_STACK, payload: null });
      dispatch({ type: TECH_STACK_ACTIONS.CLOSE_MODALS });

      await utils.techStack.list.invalidate();
    } finally {
      dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.delete.mutateAsync({ ids: [id] });
      toast.success(
        t(
          "techStack.notifications.delete.success",
          "Tech Stack deleted successfully",
        ),
      );

      dispatch({ type: TECH_STACK_ACTIONS.SELECT_TECH_STACK, payload: null });
      dispatch({ type: TECH_STACK_ACTIONS.CLOSE_MODALS });

      await utils.techStack.list.invalidate();
    } finally {
      dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleLink = async (data: LinkTechStackProjectInput) => {
    dispatch({
      type: TECH_STACK_ACTIONS.SET_PROCESSING,
      payload: data.techStackId,
    });
    try {
      await mutations.linkProject.mutateAsync(data);
      toast.success(
        t(
          "techStack.notifications.link.success",
          "Technology linked to project successfully",
        ),
      );

      await Promise.all([
        utils.techStack.list.invalidate(),
        utils.projects.list.invalidate(),
      ]);
    } finally {
      dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUnlink = async (data: UnlinkTechStackProjectInput) => {
    dispatch({
      type: TECH_STACK_ACTIONS.SET_PROCESSING,
      payload: data.techStackId,
    });
    try {
      await mutations.unlinkProject.mutateAsync(data);
      toast.success(
        t(
          "techStack.notifications.unlink.success",
          "Technology unlinked from project",
        ),
      );

      await Promise.all([
        utils.techStack.list.invalidate(),
        utils.projects.list.invalidate(),
      ]);
    } finally {
      dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleCreate,
    handleDelete,
    handleUpdate,
    handleUnlink,
    handleLink,
  };
};
