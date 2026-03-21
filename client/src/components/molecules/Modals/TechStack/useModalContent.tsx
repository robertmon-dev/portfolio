import { useMemo } from "react";
import { useTranslation } from "react-i18next"; // Dodajemy t
import { TechStackForm } from "./Forms/Main";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";
import type { TechStackActions } from "@/pages/Admin/techstack/types";

export const useModalContent = (
  state: TechStackActions["state"],
  actions: TechStackActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedTechStack, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal) return null;

    const contentMap = {
      CREATE: {
        title: t("admin.techStack.modals.create.title", "Add New Technology"),
        component: (
          <TechStackForm
            onSubmit={actions.createTechStack}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      UPDATE: {
        title: t("admin.techStack.modals.update.title", {
          name: selectedTechStack?.name,
          defaultValue: "Edit: {{name}}",
        }),
        component: selectedTechStack ? (
          <TechStackForm
            initialData={selectedTechStack}
            onSubmit={(data) =>
              actions.updateTechStack({ id: selectedTechStack.id, ...data })
            }
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ) : null,
      },
      DELETE: {
        title: t("admin.techStack.modals.delete.title", "Delete Technology"),
        component: selectedTechStack ? (
          <ConfirmDialog
            message={t("admin.techStack.modals.delete.message", {
              name: selectedTechStack.name,
              defaultValue:
                "Are you sure you want to delete {{name}}? This action cannot be undone.",
            })}
            confirmText={t("common.delete")}
            cancelText={t("common.cancel")}
            onConfirm={() => actions.deleteTechStack(selectedTechStack.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
            variant="danger"
          />
        ) : null,
      },
    };

    return contentMap[activeModal as keyof typeof contentMap];
  }, [activeModal, selectedTechStack, isAnyProcessing, actions, t]);
};
