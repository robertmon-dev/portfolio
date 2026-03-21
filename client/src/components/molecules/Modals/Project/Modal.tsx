import Modal from "@/components/molecules/Modals/Modal";
import { useProjectModalContent } from "./useModalContent";
import type { ProjectModalsProps } from "./types";
import type { ModalSize } from "../types";

export const ProjectsModals = ({ state, actions }: ProjectModalsProps) => {
  const currentModal = useProjectModalContent(state, actions);

  const handleClose = () => {
    if (state.isAnyProcessing) return;
    actions.closeModals();
  };

  const getModalSize = (): ModalSize => {
    if (state.activeModal === "DELETE" || state.activeModal === "RESTORE") {
      return "40vw";
    }

    return "10vw";
  };

  return (
    <Modal
      open={!!state.activeModal}
      onClose={handleClose}
      title={currentModal?.title ?? ""}
      size={getModalSize()}
    >
      {currentModal?.component}
    </Modal>
  );
};
