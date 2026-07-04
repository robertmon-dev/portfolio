import { toast } from "react-toastify";
import { POST_ACTIONS, type PostAction } from "./types";
import type { PostMutations } from "../useMutations";
import type { Utils } from "@/lib/trpc/types";
import type { CreatePostInput, UpdatePostInput, Post } from "@portfolio/shared";
import { useTranslation } from "react-i18next";

export const usePostsActions = (
  mutations: PostMutations,
  utils: Utils,
  dispatch: React.Dispatch<PostAction>,
) => {
  const { t } = useTranslation();

  const invalidate = async () => {
    await Promise.all([
      utils.admin.posts.list.invalidate(),
      utils.posts.list.invalidate(),
    ]);
  };

  const handleCreate = async (data: CreatePostInput) => {
    dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: "creating" });
    try {
      await mutations.create.mutateAsync(data);
      toast.success(
        t("admin.posts.create.success", "Post created successfully"),
      );

      dispatch({ type: POST_ACTIONS.CLOSE_MODALS });
      await invalidate();
    } finally {
      dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleUpdate = async (data: UpdatePostInput) => {
    dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: data.id });
    try {
      await mutations.update.mutateAsync({ ...data });
      toast.success(
        t("admin.posts.update.success", "Post updated successfully"),
      );

      dispatch({ type: POST_ACTIONS.SELECT_POST, payload: null });
      dispatch({ type: POST_ACTIONS.CLOSE_MODALS });

      await invalidate();
    } finally {
      dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: id });
    try {
      await mutations.delete.mutateAsync({ id });
      toast.success(t("admin.posts.delete.success", "Post moved to trash"));

      dispatch({ type: POST_ACTIONS.SELECT_POST, payload: null });
      dispatch({ type: POST_ACTIONS.CLOSE_MODALS });

      await invalidate();
    } finally {
      dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  const handleTogglePublish = async (post: Post) => {
    dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: post.id });
    try {
      await mutations.changeVisibility.mutateAsync({
        id: post.id,
        publishedAt: post.publishedAt ? null : new Date(),
      });
      toast.success(
        post.publishedAt
          ? t("admin.posts.unpublish.success", "Post unpublished")
          : t("admin.posts.publish.success", "Post published"),
      );

      await invalidate();
    } finally {
      dispatch({ type: POST_ACTIONS.SET_PROCESSING, payload: null });
    }
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleTogglePublish,
  };
};
