import { toast } from "react-toastify";
import { EXPERIENCE_ACTIONS, type ExperienceAction } from "./types";
import { toIso, toNullableIso, toOptionalIso } from "@/lib/utils/date";
import type { ExperienceMutations } from "../useMutations";
import type { Utils } from "@/lib/trpc/types";
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@portfolio/shared";
import { useTranslation } from "react-i18next";

export const useExperienceActions = (
  mutations: ExperienceMutations,
  utils: Utils,
  dispatch: React.Dispatch<ExperienceAction>,
) => {
  const { t } = useTranslation();

  const handleCreate = async (data: CreateExperienceInput) => {
    dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: "creating" });
    try {
      await mutations.create.mutateAsync({
        ...data,
        startDate: toIso(data.startDate),
        endDate: toNullableIso(data.endDate),
      });

      toast.success(
        t("experience.notifications.createSuccess", {
          defaultValue: "Experience added successfully",
        }),
      );

      dispatch({ type: EXPERIENCE_ACTIONS.CLOSE_MODALS });
      await utils.experience.list.invalidate();
    } finally {
      dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdate = async (data: UpdateExperienceInput) => {
    dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      const payload = {
        ...data,
        startDate: toOptionalIso(data.startDate),
        endDate: toNullableIso(data.endDate),
      };

      await mutations.update.mutateAsync(payload);

      toast.success(
        t("experience.notifications.updateSuccess", {
          defaultValue: "Experience updated successfully",
        }),
      );

      dispatch({ type: EXPERIENCE_ACTIONS.SELECT_EXPERIENCE, payload: null });
      dispatch({ type: EXPERIENCE_ACTIONS.CLOSE_MODALS });
      await utils.experience.list.invalidate();
    } finally {
      dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (ids: string[]) => {
    dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: ids[0] });
    try {
      await mutations.delete.mutateAsync({ ids });

      toast.success(
        t("experience.notifications.deleteSuccess", {
          defaultValue: "Experience(s) deleted permanently",
        }),
      );

      dispatch({ type: EXPERIENCE_ACTIONS.SELECT_EXPERIENCE, payload: null });
      dispatch({ type: EXPERIENCE_ACTIONS.CLOSE_MODALS });
      await utils.experience.list.invalidate();
    } finally {
      dispatch({ type: EXPERIENCE_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleCreate,
    handleDelete,
    handleUpdate,
  };
};
