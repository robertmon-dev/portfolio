import Modal from "@/components/molecules/Modals/Modal";
import { useModalContent } from "./useModalContent";
import type { UserModalProps } from "./types";
import "./UserModal.scss";

export const UsersModals = ({ state, actions }: UserModalProps) => {
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
      size={state.activeModal === "UPDATE" ? "40vw" : "default"}
      role={state.activeModal === "DELETE" ? "alertdialog" : "dialog"}
    >
      {currentModal?.component}
    </Modal>
  );
};
