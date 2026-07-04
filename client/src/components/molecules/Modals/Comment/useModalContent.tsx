import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CommentForm } from "./Forms/Main";
import type { CommentAdminActions } from "@/pages/Admin/comments/types";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export const useCommentModalContent = (
  state: CommentAdminActions["state"],
  actions: CommentAdminActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedComment, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal) return null;

    const contentMap = {
      CREATE: null,
      UPDATE: {
        title: t("admin.comments.modals.edit.title", "Edit comment"),
        component: (
          <CommentForm
            initialData={selectedComment}
            onSubmit={(content) =>
              void actions.updateComment({
                id: selectedComment!.id,
                content,
              })
            }
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      DELETE: {
        title: t("admin.comments.modals.delete.title", "Remove comment"),
        component: (
          <ConfirmDialog
            message={t(
              "admin.comments.modals.delete.confirm",
              "Are you sure you want to remove this comment?",
            )}
            confirmText={t("common.delete", "Remove")}
            variant="danger"
            onConfirm={() => void actions.deleteComment(selectedComment!.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
    };

    return contentMap[activeModal];
  }, [activeModal, selectedComment, isAnyProcessing, actions, t]);
};
