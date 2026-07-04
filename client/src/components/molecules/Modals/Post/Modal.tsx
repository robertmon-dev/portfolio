import Modal from "@/components/molecules/Modals/Modal";
import { usePostModalContent } from "./useModalContent";
import type { PostModalsProps } from "./types";

export const PostsModals = ({ state, actions }: PostModalsProps) => {
  const currentModal = usePostModalContent(state, actions);

  const handleClose = () => {
    if (state.isAnyProcessing) return;
    actions.closeModals();
  };

  return (
    <Modal
      open={!!state.activeModal}
      onClose={handleClose}
      title={currentModal?.title ?? ""}
      size={state.activeModal === "DELETE" ? "20vw" : "40vw"}
    >
      {currentModal?.component}
    </Modal>
  );
};
