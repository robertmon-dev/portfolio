import { toast } from "react-toastify";
import { notifyError } from "@/lib/trpc/handlers/trpcError";
import { EXPERIENCE_ACTIONS, type ExperienceAction } from "./types";
import type { ExperienceMutations } from "../useMutations";
import type { Utils } from "@/lib/trpc/types";
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@portfolio/shared";

export const handleCreate = async (
  mutations: ExperienceMutations,
  utils: Utils,
  dispatch: React.Dispatch<ExperienceAction>,
  data: CreateExperienceInput,
) => {
  dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: "creating" });
  try {
    await mutations.create.mutateAsync({
      ...data,
      endDate: data.endDate ?? null,
      startDate: data.startDate,
    });
    toast.success("Experience added successfully");
    dispatch({ type: EXPERIENCE_ACTIONS.CLOSE_MODALS });
    await utils.experience.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleUpdate = async (
  mutations: ExperienceMutations,
  utils: Utils,
  dispatch: React.Dispatch<ExperienceAction>,
  data: UpdateExperienceInput,
) => {
  dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: data.id });
  try {
    await mutations.update.mutateAsync(data);
    toast.success("Experience updated successfully");
    dispatch({ type: EXPERIENCE_ACTIONS.SELECT_EXPERIENCE, payload: null });
    dispatch({ type: EXPERIENCE_ACTIONS.CLOSE_MODALS });
    await utils.experience.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: null });
  }
};

export const handleDelete = async (
  mutations: ExperienceMutations,
  utils: Utils,
  dispatch: React.Dispatch<ExperienceAction>,
  ids: string[],
) => {
  dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: ids[0] });
  try {
    await mutations.delete.mutateAsync({ ids });
    toast.success("Experience(s) deleted permanently");
    dispatch({ type: EXPERIENCE_ACTIONS.SELECT_EXPERIENCE, payload: null });
    dispatch({ type: EXPERIENCE_ACTIONS.CLOSE_MODALS });
    await utils.experience.list.invalidate();
  } catch (error) {
    notifyError(error);
  } finally {
    dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: null });
  }
};
