import Modal from "@/components/molecules/Modals/Modal";
import { useProjectModalContent } from "./useModalContent";
import type { ProjectModalsProps } from "./types";

export const ProjectsModals = ({ state, actions }: ProjectModalsProps) => {
  const currentModal = useProjectModalContent(state, actions);

  const handleClose = () => {
    if (state.isAnyProcessing) return;
    actions.closeModals();
  };

  return (
    <Modal
      open={!!state.activeModal}
      onClose={handleClose}
      title={currentModal?.title ?? ""}
      size={"40vw"}
    >
      {currentModal?.component}
    </Modal>
  );
};
