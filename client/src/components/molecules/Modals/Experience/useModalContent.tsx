import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ExperienceForm } from "./Forms/Main";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";
import type { ExperienceActions } from "@/pages/Admin/experience/types";

export const useExperienceModalContent = (
  state: ExperienceActions["state"],
  actions: ExperienceActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedExperience, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal) return null;

    const contentMap = {
      CREATE: {
        title: t("admin.experience.modals.create.title", "Add new experience"),
        component: (
          <ExperienceForm
            onSubmit={(data) => actions.createExperience(data)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      UPDATE: {
        title: t("admin.experience.modals.edit.title", "Edit experience"),
        component: (
          <ExperienceForm
            initialData={selectedExperience}
            onSubmit={(data) =>
              actions.updateExperience({ id: selectedExperience!.id, ...data })
            }
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      DELETE: {
        title: t("admin.experience.modals.delete.title", "Delete experience"),
        component: (
          <ConfirmDialog
            message={t("admin.experience.modals.delete.confirm", {
              position: selectedExperience?.position,
              company: selectedExperience?.company,
              defaultValue: "Are you sure you want to delete this experience?",
            })}
            confirmText={t("common.delete", "Delete")}
            variant="danger"
            onConfirm={() => actions.deleteExperience(selectedExperience!.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
    };

    return contentMap[activeModal];
  }, [activeModal, selectedExperience, isAnyProcessing, actions, t]);
};
