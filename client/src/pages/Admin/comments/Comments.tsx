import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCommentsAdminState } from "./useCommentsAdminState";
import { getCommentColumns } from "./components/getCommentColumns";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { CommentsModals } from "@/components/molecules/Modals/Comment/Modal";
import { MessageCircle, CornerDownRight, Trash2 } from "lucide-react";
import "./Comments.scss";

export const CommentsAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useCommentsAdminState();

  const headerTags = useMemo(() => {
    const total = state.comments.length;
    const replies = state.comments.filter((c) => c.isReply).length;
    const deleted = state.comments.filter((c) => c.deletedAt).length;

    return [
      {
        id: "total",
        children: t("admin.comments.tags.total", {
          count: total,
          defaultValue: "{{count}} Comments",
        }),
        variant: "info" as const,
        icon: <MessageCircle size={12} />,
      },
      {
        id: "replies",
        children: t("admin.comments.tags.replies", {
          count: replies,
          defaultValue: "{{count}} Replies",
        }),
        variant: "default" as const,
        icon: <CornerDownRight size={12} />,
      },
      {
        id: "deleted",
        children: t("admin.comments.tags.deleted", {
          count: deleted,
          defaultValue: "{{count}} Deleted",
        }),
        variant: "danger" as const,
        icon: <Trash2 size={12} />,
      },
    ];
  }, [state.comments, t]);

  const columns = useMemo(
    () =>
      getCommentColumns(
        t,
        (comment) => actions.openModal("UPDATE", comment.id),
        (id) => {
          actions.openModal("DELETE", id);
        },
        (id) => void actions.restoreComment(id),
        state.processingId,
      ),
    [t, actions, state.processingId],
  );

  return (
    <div className="comments-management">
      <Header
        title={t("admin.comments.title", "Comments Management")}
        subtitle={t(
          "admin.comments.subtitle",
          "Moderate the discussion under your blog posts",
        )}
        tags={headerTags}
      />

      <div className="comments-management__loader-container">
        <LoadingBar isLoading={state.isLoading} variant="primary" fullWidth />
      </div>

      <main className="comments-management__content">
        <EntityTable
          data={state.comments}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(comment) => actions.selectComment(comment.id)}
        />
      </main>

      <CommentsModals state={state} actions={actions} />
    </div>
  );
};
