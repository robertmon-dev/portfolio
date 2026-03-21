import Modal from "@/components/molecules/Modals/Modal";
import { useModalContent } from "./useModalContent";
import type { TechStackModalProps } from "./types";

export const TechStackModals = ({ state, actions }: TechStackModalProps) => {
  const currentModal = useModalContent(state, actions);

  const handleClose = () => {
    if (state.isAnyProcessing) return;
    actions.closeModals();
  };

  return (
    <Modal
      open={!!state.activeModal}
      onClose={handleClose}
      title={currentModal?.title ?? ""}
      size={"default"}
      role={state.activeModal === "DELETE" ? "alertdialog" : "dialog"}
    >
      {currentModal?.component}
    </Modal>
  );
};
