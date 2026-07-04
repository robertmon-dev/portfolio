import Modal from "@/components/molecules/Modals/Modal";
import { useCommentModalContent } from "./useModalContent";
import type { CommentModalsProps } from "./types";

export const CommentsModals = ({ state, actions }: CommentModalsProps) => {
  const currentModal = useCommentModalContent(state, actions);

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
