import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useReactionsAdminState } from "./useReactionsAdminState";
import { getReactionColumns } from "./components/getReactionColumns";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { ReactionsModals } from "@/components/molecules/Modals/Reaction/Modal";
import { Heart, FileText, MessageCircle } from "lucide-react";
import "./Reactions.scss";

export const ReactionsAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useReactionsAdminState();

  const headerTags = useMemo(() => {
    const total = state.reactions.length;
    const onPosts = state.reactions.filter((r) => r.postId).length;
    const onComments = state.reactions.filter((r) => r.commentId).length;

    return [
      {
        id: "total",
        children: t("admin.reactions.tags.total", {
          count: total,
          defaultValue: "{{count}} Reactions",
        }),
        variant: "info" as const,
        icon: <Heart size={12} />,
      },
      {
        id: "posts",
        children: t("admin.reactions.tags.posts", {
          count: onPosts,
          defaultValue: "{{count}} On posts",
        }),
        variant: "success" as const,
        icon: <FileText size={12} />,
      },
      {
        id: "comments",
        children: t("admin.reactions.tags.comments", {
          count: onComments,
          defaultValue: "{{count}} On comments",
        }),
        variant: "default" as const,
        icon: <MessageCircle size={12} />,
      },
    ];
  }, [state.reactions, t]);

  const columns = useMemo(
    () =>
      getReactionColumns(
        t,
        (id) => {
          actions.openModal("DELETE", id);
        },
        state.processingId,
      ),
    [t, actions, state.processingId],
  );

  return (
    <div className="reactions-management">
      <Header
        title={t("admin.reactions.title", "Reactions Management")}
        subtitle={t(
          "admin.reactions.subtitle",
          "Review and moderate reactions across posts and comments",
        )}
        tags={headerTags}
      />

      <div className="reactions-management__loader-container">
        <LoadingBar isLoading={state.isLoading} variant="primary" fullWidth />
      </div>

      <main className="reactions-management__content">
        <EntityTable
          data={state.reactions}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(reaction) => actions.selectReaction(reaction.id)}
        />
      </main>

      <ReactionsModals state={state} actions={actions} />
    </div>
  );
};
