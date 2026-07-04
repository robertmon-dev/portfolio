import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePostsState } from "./usePostsState";
import { getPostColumns } from "./components/getPostColumns";
import { Button } from "@/components/atoms/Button/Button";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { PostsModals } from "@/components/molecules/Modals/Post/Modal";
import { FileText, Eye, EyeOff, Plus } from "lucide-react";
import "./Posts.scss";

export const PostsAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = usePostsState();

  const headerTags = useMemo(() => {
    const total = state.posts.length;
    const published = state.posts.filter((p) => p.publishedAt).length;
    const drafts = total - published;

    return [
      {
        id: "total",
        children: t("admin.posts.tags.total", {
          count: total,
          defaultValue: "{{count}} Posts",
        }),
        variant: "info" as const,
        icon: <FileText size={12} />,
      },
      {
        id: "published",
        children: t("admin.posts.tags.published", {
          count: published,
          defaultValue: "{{count}} Published",
        }),
        variant: "success" as const,
        icon: <Eye size={12} />,
      },
      {
        id: "drafts",
        children: t("admin.posts.tags.drafts", {
          count: drafts,
          defaultValue: "{{count}} Drafts",
        }),
        variant: "warning" as const,
        icon: <EyeOff size={12} />,
      },
    ];
  }, [state.posts, t]);

  const columns = useMemo(
    () =>
      getPostColumns(
        t,
        (post) => actions.openModal("UPDATE", post.id),
        (id) => {
          actions.openModal("DELETE", id);
        },
        (post) => void actions.togglePublish(post),
        (post) => void actions.restorePost(post),
        state.processingId,
      ),
    [t, actions, state.processingId],
  );

  return (
    <div className="posts-management">
      <Header
        title={t("admin.posts.title", "Posts Management")}
        subtitle={t(
          "admin.posts.subtitle",
          "Write, publish and manage your blog posts",
        )}
        tags={headerTags}
        action={
          <Button
            onClick={() => actions.openModal("CREATE")}
            variant="primary"
            size="sm"
          >
            <Plus size={16} />
            {t("admin.posts.actions.add", "Add Post")}
          </Button>
        }
      />

      <div className="posts-management__loader-container">
        <LoadingBar isLoading={state.isLoading} variant="primary" fullWidth />
      </div>

      <main className="posts-management__content">
        <EntityTable
          data={state.posts}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(post) => actions.selectPost(post.id)}
        />
      </main>

      <PostsModals state={state} actions={actions} />
    </div>
  );
};
