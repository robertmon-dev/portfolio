import { useTranslation } from "react-i18next";
import Modal from "@/components/molecules/Modals/Modal";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";
import type { ReactionModalsProps } from "./types";

export const ReactionsModals = ({ state, actions }: ReactionModalsProps) => {
  const { t } = useTranslation();
  const { activeModal, selectedReaction, isAnyProcessing } = state;

  const handleClose = () => {
    if (isAnyProcessing) return;
    actions.closeModals();
  };

  return (
    <Modal
      open={activeModal === "DELETE"}
      onClose={handleClose}
      title={t("admin.reactions.modals.delete.title", "Remove reaction")}
      size="20vw"
    >
      <ConfirmDialog
        message={t(
          "admin.reactions.modals.delete.confirm",
          "Are you sure you want to remove this reaction?",
        )}
        confirmText={t("common.delete", "Remove")}
        variant="danger"
        onConfirm={() => void actions.deleteReaction(selectedReaction!.id)}
        onCancel={actions.closeModals}
        isLoading={isAnyProcessing}
      />
    </Modal>
  );
};
