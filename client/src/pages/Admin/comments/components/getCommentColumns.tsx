import type { Comment } from "@portfolio/shared";
import type { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import {
  Trash2,
  Edit2,
  Heart,
  MessageCircle,
  CornerDownRight,
  RotateCcw,
  Shield,
} from "lucide-react";
import type { TFunction } from "i18next";

export const getCommentColumns = (
  t: TFunction,
  onEdit: (comment: Comment) => void,
  onDelete: (id: string) => void,
  onRestore: (id: string) => void,
  processingId: string | null,
): Column<Comment>[] => [
  {
    key: "content",
    header: t("admin.comments.table.comment", "Comment"),
    width: "35%",
    render: (comment) => (
      <div className="comments-table__content-col">
        <span className="comments-table__content" title={comment.content}>
          {comment.content}
        </span>
        <span className="comments-table__post" title={comment.postId}>
          {t("admin.comments.table.post", "Post")}: {comment.postId.slice(0, 8)}
          ...
        </span>
      </div>
    ),
  },
  {
    key: "status",
    header: t("admin.comments.table.status", "Status"),
    width: "12%",
    render: (comment) => (
      <div className="comments-table__kind-col">
        {comment.deletedAt ? (
          <Tag variant="danger" size="sm" icon={<Trash2 size={12} />}>
            {t("admin.comments.table.deleted", "Deleted")}
          </Tag>
        ) : comment.isReply ? (
          <Tag variant="default" size="sm" icon={<CornerDownRight size={12} />}>
            {t("admin.comments.table.reply", "Reply")}
          </Tag>
        ) : (
          <Tag variant="info" size="sm" icon={<MessageCircle size={12} />}>
            {t("admin.comments.table.comment", "Comment")}
          </Tag>
        )}
      </div>
    ),
  },
  {
    key: "visibility",
    header: t("admin.comments.table.visibility", "Visibility"),
    width: "13%",
    render: (comment) => (
      <Tag variant="info" size="sm" icon={<Shield size={12} />}>
        {comment.visibility}
      </Tag>
    ),
  },
  {
    key: "stats",
    header: t("admin.comments.table.stats", "Stats"),
    width: "15%",
    render: (comment) => (
      <div className="comments-table__stats-col">
        <span className="comments-table__stat">
          <Heart size={12} />
          {comment.reactions.length}
        </span>
        <span className="comments-table__stat">
          <CornerDownRight size={12} />
          {comment.replies.length}
        </span>
      </div>
    ),
  },
  {
    key: "createdAt",
    header: t("admin.comments.table.created", "Created"),
    width: "12%",
    render: (comment) => (
      <span className="comments-table__date">
        {new Date(comment.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "actions",
    header: t("admin.comments.table.actions", "Actions"),
    align: "right",
    width: "13%",
    render: (comment) => (
      <div
        className="comments-table__actions"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          isIcon
          onClick={() => onEdit(comment)}
          title={t("common.edit", "Edit")}
          disabled={processingId === comment.id}
        >
          <Edit2 size={14} />
        </Button>
        {comment.deletedAt ? (
          <Button
            variant="ghost"
            size="sm"
            isIcon
            onClick={() => onRestore(comment.id)}
            isLoading={processingId === comment.id}
            title={t("common.restore", "Restore")}
          >
            <RotateCcw size={14} />
          </Button>
        ) : (
          <Button
            variant="danger"
            size="sm"
            isIcon
            onClick={() => onDelete(comment.id)}
            isLoading={processingId === comment.id}
            title={t("common.delete", "Delete")}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>
    ),
  },
];
