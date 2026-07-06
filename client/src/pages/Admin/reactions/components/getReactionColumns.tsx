import type { Reaction } from "@portfolio/shared";
import type { Column } from "@/components/molecules/EntityTable/types";
import { Tag } from "@/components/atoms/Tag/Tag";
import { Button } from "@/components/atoms/Button/Button";
import { Trash2, FileText, MessageCircle, RotateCcw } from "lucide-react";
import { REACTION_ICONS } from "@/pages/Post/consts";
import type { TFunction } from "i18next";

export const getReactionColumns = (
  t: TFunction,
  onDelete: (id: string) => void,
  onRestore: (id: string) => void,
  processingId: string | null,
): Column<Reaction>[] => [
  {
    key: "type",
    header: t("admin.reactions.table.type", "Type"),
    width: "20%",
    render: (reaction) => {
      const Icon = REACTION_ICONS[reaction.type];

      return (
        <span className="reactions-table__type">
          <Icon size={16} className="reactions-table__type-icon" />
          {reaction.type}
        </span>
      );
    },
  },
  {
    key: "target",
    header: t("admin.reactions.table.target", "Target"),
    width: "25%",
    render: (reaction) =>
      reaction.postId ? (
        <Tag
          variant="info"
          size="sm"
          icon={<FileText size={12} />}
          title={reaction.postId}
        >
          {t("admin.reactions.table.post", "Post")}:{" "}
          {reaction.postId.slice(0, 8)}…
        </Tag>
      ) : reaction.commentId ? (
        <Tag
          variant="default"
          size="sm"
          icon={<MessageCircle size={12} />}
          title={reaction.commentId}
        >
          {t("admin.reactions.table.comment", "Comment")}:{" "}
          {reaction.commentId.slice(0, 8)}…
        </Tag>
      ) : (
        <span className="reactions-table__empty">—</span>
      ),
  },
  {
    key: "status",
    header: t("admin.reactions.table.status", "Status"),
    width: "15%",
    render: (reaction) =>
      reaction.deletedAt ? (
        <Tag variant="danger" size="sm" icon={<Trash2 size={12} />}>
          {t("admin.reactions.table.deleted", "Deleted")}
        </Tag>
      ) : (
        <Tag variant="success" size="sm">
          {t("admin.reactions.table.active", "Active")}
        </Tag>
      ),
  },
  {
    key: "author",
    header: t("admin.reactions.table.author", "Author"),
    width: "15%",
    render: (reaction) => (
      <span className="reactions-table__author" title={reaction.authorId}>
        {reaction.authorId.slice(0, 8)}…
      </span>
    ),
  },
  {
    key: "createdAt",
    header: t("admin.reactions.table.created", "Created"),
    width: "12%",
    render: (reaction) => (
      <span className="reactions-table__date">
        {reaction.createdAt
          ? new Date(reaction.createdAt).toLocaleDateString()
          : "—"}
      </span>
    ),
  },
  {
    key: "actions",
    header: t("admin.reactions.table.actions", "Actions"),
    align: "right",
    width: "13%",
    render: (reaction) => (
      <div
        className="reactions-table__actions"
        onClick={(e) => e.stopPropagation()}
      >
        {reaction.deletedAt ? (
          <Button
            variant="ghost"
            size="sm"
            isIcon
            onClick={() => onRestore(reaction.id)}
            isLoading={processingId === reaction.id}
            title={t("common.restore", "Restore")}
          >
            <RotateCcw size={14} />
          </Button>
        ) : (
          <Button
            variant="danger"
            size="sm"
            isIcon
            onClick={() => onDelete(reaction.id)}
            isLoading={processingId === reaction.id}
            title={t("common.delete", "Delete")}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>
    ),
  },
];
