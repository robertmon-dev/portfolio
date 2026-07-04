import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserRound, CornerDownRight, Reply } from "lucide-react";
import {
  REACTION_TYPE,
  type ReactionKind,
  type Comment,
  type BaseComment,
} from "@portfolio/shared";
import { Button } from "@/components/atoms/Button/Button";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { REACTION_ICONS } from "../consts";
import "./CommentThread.scss";

export type CommentNode = Comment | BaseComment;

interface CommentThreadProps {
  comment: CommentNode;
  depth: number;
  getChildren: (comment: CommentNode) => CommentNode[];
  onReply: (parentId: string, content: string) => Promise<void>;
  onReact: (commentId: string, type: ReactionKind) => Promise<void>;
  canComment: boolean;
  canReact: boolean;
  isProcessing: boolean;
}

const MAX_INDENT_DEPTH = 4;

export const CommentThread = ({
  comment,
  depth,
  getChildren,
  onReply,
  onReact,
  canComment,
  canReact,
  isProcessing,
}: CommentThreadProps) => {
  const { t, i18n } = useTranslation();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const children = getChildren(comment);

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    i18n.language,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const reactionCounts = useMemo(() => {
    const counts = Object.fromEntries(
      REACTION_TYPE.map((type) => [type, 0]),
    ) as Record<ReactionKind, number>;

    comment.reactions.forEach((reaction) => {
      counts[reaction.type] += 1;
    });

    return counts;
  }, [comment.reactions]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = replyContent.trim();
    if (!trimmed) return;

    await onReply(comment.id, trimmed);
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <li className="comment-thread">
      <div
        className={`comment-thread__card${
          comment.isReply ? " comment-thread__card--reply" : ""
        }`}
      >
        <div className="comment-thread__header">
          <span className="comment-thread__author">
            {comment.isReply && <CornerDownRight size={12} />}
            <UserRound size={14} />
            {t("post.comments.author", "Reader")}
          </span>
          <span className="comment-thread__date">{formattedDate}</span>
        </div>

        <p className="comment-thread__content">{comment.content}</p>

        <div className="comment-thread__footer">
          <div className="comment-thread__reactions">
            {REACTION_TYPE.map((type) => {
              const Icon = REACTION_ICONS[type];
              const count = reactionCounts[type];

              return (
                <button
                  key={type}
                  type="button"
                  className="comment-thread__reaction"
                  onClick={() => void onReact(comment.id, type)}
                  disabled={!canReact || isProcessing}
                  title={
                    canReact
                      ? type
                      : t("post.reactions.loginPrompt", "Sign in to react")
                  }
                >
                  <Icon size={13} className="comment-thread__reaction-icon" />
                  {count > 0 && (
                    <span className="comment-thread__reaction-count">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {canComment && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying((open) => !open)}
              disabled={isProcessing}
            >
              <Reply size={14} />
              {t("post.comments.reply", "Reply")}
            </Button>
          )}
        </div>
      </div>

      {isReplying && (
        <form
          className="comment-thread__reply-form"
          onSubmit={(e) => void handleReplySubmit(e)}
        >
          <TextArea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder={t(
              "post.comments.replyPlaceholder",
              "Write a reply...",
            )}
            rows={2}
            fullWidth
            disabled={isProcessing}
          />
          <div className="comment-thread__reply-actions">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(false)}
              disabled={isProcessing}
            >
              {t("common.cancel", "Cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isProcessing}
              disabled={!replyContent.trim()}
            >
              {t("post.comments.replySubmit", "Post reply")}
            </Button>
          </div>
        </form>
      )}

      {children.length > 0 && (
        <ul
          className={`comment-thread__children${
            depth >= MAX_INDENT_DEPTH ? " comment-thread__children--flat" : ""
          }`}
        >
          {children.map((child) => (
            <CommentThread
              key={child.id}
              comment={child}
              depth={depth + 1}
              getChildren={getChildren}
              onReply={onReply}
              onReact={onReact}
              canComment={canComment}
              canReact={canReact}
              isProcessing={isProcessing}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
