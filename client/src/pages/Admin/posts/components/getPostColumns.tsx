import type { Post } from "@portfolio/shared";
import type { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import {
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Send,
  Undo2,
  MessageCircle,
  Heart,
  Shield,
} from "lucide-react";
import type { TFunction } from "i18next";

export const getPostColumns = (
  t: TFunction,
  onEdit: (post: Post) => void,
  onDelete: (id: string) => void,
  onTogglePublish: (post: Post) => void,
  processingId: string | null,
): Column<Post>[] => [
  {
    key: "title",
    header: t("admin.posts.table.post", "Post"),
    width: "25%",
    render: (post) => (
      <div className="posts-table__title-col">
        <span className="posts-table__title" title={post.title}>
          {post.title}
        </span>
        <span className="posts-table__slug" title={`/${post.slug}`}>
          /{post.slug}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    header: t("admin.posts.table.status", "Status"),
    width: "15%",
    render: (post) => (
      <div className="posts-table__status-col">
        {post.deletedAt ? (
          <Tag variant="danger" size="sm" icon={<Trash2 size={12} />}>
            {t("admin.posts.table.deleted", "Deleted")}
          </Tag>
        ) : post.publishedAt ? (
          <Tag variant="success" size="sm" icon={<Eye size={12} />}>
            {t("admin.posts.table.published", "Published")}
          </Tag>
        ) : (
          <Tag variant="default" size="sm" icon={<EyeOff size={12} />}>
            {t("common.draft", "Draft")}
          </Tag>
        )}
      </div>
    ),
  },
  {
    key: "visibility",
    header: t("admin.posts.table.visibility", "Visibility"),
    width: "12%",
    render: (post) => (
      <Tag variant="info" size="sm" icon={<Shield size={12} />}>
        {post.visibility}
      </Tag>
    ),
  },
  {
    key: "stats",
    header: t("admin.posts.table.stats", "Stats"),
    width: "18%",
    render: (post) => (
      <div className="posts-table__stats-col">
        <span
          className="posts-table__stat"
          title={t("blog.post.views", "{{count}} views", {
            count: post.viewCount,
          })}
        >
          <Eye size={12} />
          {post.viewCount}
        </span>
        <span className="posts-table__stat">
          <MessageCircle size={12} />
          {post.comments?.length || post.commentIds?.length || 0}
        </span>
        <span className="posts-table__stat">
          <Heart size={12} />
          {post.reactions?.length || post.reactionIds?.length || 0}
        </span>
      </div>
    ),
  },
  {
    key: "createdAt",
    header: t("admin.posts.table.created", "Created"),
    width: "15%",
    render: (post) => (
      <span className="posts-table__date">
        {new Date(post.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "actions",
    header: t("admin.posts.table.actions", "Actions"),
    align: "right",
    width: "15%",
    render: (post) => (
      <div
        className="posts-table__actions"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          isIcon
          onClick={() => onTogglePublish(post)}
          title={
            post.publishedAt
              ? t("admin.posts.actions.unpublish", "Unpublish")
              : t("admin.posts.actions.publish", "Publish")
          }
          disabled={processingId === post.id || !!post.deletedAt}
        >
          {post.publishedAt ? <Undo2 size={14} /> : <Send size={14} />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          isIcon
          onClick={() => onEdit(post)}
          title={t("common.edit", "Edit")}
          disabled={processingId === post.id}
        >
          <Edit2 size={14} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          isIcon
          onClick={() => onDelete(post.id)}
          isLoading={processingId === post.id}
          title={t("common.delete", "Delete")}
          disabled={!!post.deletedAt}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    ),
  },
];
