import Modal from "@/components/molecules/Modals/Modal";
import { useExperienceModalContent } from "./useModalContent";
import type { ExperienceModalProps } from "./types";

export const ExperienceModals = ({ state, actions }: ExperienceModalProps) => {
  const currentModal = useExperienceModalContent(state, actions);
  const { activeModal } = state;

  const handleClose = () => {
    if (state.isAnyProcessing) return;
    actions.closeModals();
  };

  return (
    <Modal
      open={!!state.activeModal}
      onClose={handleClose}
      title={currentModal?.title ?? ""}
      size={activeModal === "DELETE" ? "20vw" : "40vw"}
    >
      {currentModal?.component}
    </Modal>
  );
};
