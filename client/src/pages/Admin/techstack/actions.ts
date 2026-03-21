import { toast } from "react-toastify";
import { notifyError } from "@/lib/trpc/handlers/trpcError";
import { TECH_STACK_ACTIONS, type TechStackAction } from "./types";
import type { Utils } from "@/lib/trpc/types";
import type {
  CreateTechStackInput,
  UpdateTechStackInput,
  UnlinkTechStackProjectInput,
  LinkTechStackProjectInput,
} from "@portfolio/shared";
import type { TechStackMutations } from "../useMutations";

export const handleCreate = async (
  mutations: TechStackMutations,
  utils: Utils,
  dispatch: React.Dispatch<TechStackAction>,
  data: CreateTechStackInput,
) => {
  dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: "creating" });
  try {
    await mutations.create.mutateAsync(data);
    toast.success("Tech Stack created successfully");

    dispatch({ type: TECH_STACK_ACTIONS.CLOSE_MODALS });
    await utils.techStack.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleUpdate = async (
  mutations: TechStackMutations,
  utils: Utils,
  dispatch: React.Dispatch<TechStackAction>,
  data: UpdateTechStackInput,
) => {
  dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: data.id });
  try {
    await mutations.update.mutateAsync(data);

    toast.success("Tech Stack updated successfully");
    dispatch({ type: TECH_STACK_ACTIONS.SELECT_TECH_STACK, payload: null });
    dispatch({ type: TECH_STACK_ACTIONS.CLOSE_MODALS });

    await utils.techStack.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleDelete = async (
  mutations: TechStackMutations,
  utils: Utils,
  dispatch: React.Dispatch<TechStackAction>,
  id: string,
) => {
  dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: id });
  try {
    await mutations.delete.mutateAsync({ ids: [id] });
    toast.success("Tech Stack deleted successfully");

    dispatch({ type: TECH_STACK_ACTIONS.SELECT_TECH_STACK, payload: null });
    dispatch({ type: TECH_STACK_ACTIONS.CLOSE_MODALS });

    await utils.techStack.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleLink = async (
  mutations: TechStackMutations,
  utils: Utils,
  dispatch: React.Dispatch<TechStackAction>,
  data: LinkTechStackProjectInput,
) => {
  dispatch({
    type: TECH_STACK_ACTIONS.SET_PROCESSING,
    payload: data.techStackId,
  });
  try {
    await mutations.linkProject.mutateAsync(data);
    toast.success("Technology linked to project successfully");

    await Promise.all([
      utils.techStack.list.invalidate(),
      utils.projects.list.invalidate(),
    ]);
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleUnlink = async (
  mutations: TechStackMutations,
  utils: Utils,
  dispatch: React.Dispatch<TechStackAction>,
  data: UnlinkTechStackProjectInput,
) => {
  dispatch({
    type: TECH_STACK_ACTIONS.SET_PROCESSING,
    payload: data.techStackId,
  });
  try {
    await mutations.unlinkProject.mutateAsync(data);
    toast.success("Technology unlinked from project");

    await Promise.all([
      utils.techStack.list.invalidate(),
      utils.projects.list.invalidate(),
    ]);
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: TECH_STACK_ACTIONS.SET_PROCESSING, payload: null });
  }
};
