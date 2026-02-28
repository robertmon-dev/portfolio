import Modal from "@/components/molecules/Modals/Modal";
import { useModalContent } from "./useModalContent";
import type { GithubModalsProps } from "./types";

export const GithubModals = ({ state, actions }: GithubModalsProps) => {
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
      size="default"
    >
      {currentModal?.component}
    </Modal>
  );
};
