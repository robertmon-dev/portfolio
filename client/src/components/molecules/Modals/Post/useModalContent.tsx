import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PostForm } from "./Forms/Main";
import type { PostAdminActions } from "@/pages/Admin/posts/types";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export const usePostModalContent = (
  state: PostAdminActions["state"],
  actions: PostAdminActions["actions"],
) => {
  const { t } = useTranslation();
  const { activeModal, selectedPost, isAnyProcessing } = state;

  return useMemo(() => {
    if (!activeModal) return null;

    const contentMap = {
      CREATE: {
        title: t("admin.posts.modals.create.title", "Create new post"),
        component: (
          <PostForm
            onSubmit={(data) => void actions.createPost(data)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      UPDATE: {
        title: t("admin.posts.modals.edit.title", "Edit post"),
        component: (
          <PostForm
            initialData={selectedPost}
            onSubmit={(data) =>
              void actions.updatePost({
                id: selectedPost!.id,
                viewCount: selectedPost!.viewCount,
                deletedAt: selectedPost!.deletedAt,
                updatedAt: selectedPost!.updatedAt,
                createdAt: selectedPost!.createdAt,
                ...data,
              })
            }
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
      DELETE: {
        title: t("admin.posts.modals.delete.title", "Remove post"),
        component: (
          <ConfirmDialog
            message={t("admin.posts.modals.delete.confirm", {
              title: selectedPost?.title,
              defaultValue: "Are you sure about that?",
            })}
            confirmText={t("common.delete", "Remove")}
            variant="danger"
            onConfirm={() => void actions.deletePost(selectedPost!.id)}
            onCancel={actions.closeModals}
            isLoading={isAnyProcessing}
          />
        ),
      },
    };

    return contentMap[activeModal];
  }, [activeModal, selectedPost, isAnyProcessing, actions, t]);
};
