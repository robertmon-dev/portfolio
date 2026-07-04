import { useTranslation } from "react-i18next";
import { UserRound, Heart, CornerDownRight } from "lucide-react";
import type { Comment, BaseComment } from "@portfolio/shared";
import "./CommentItem.scss";

const CommentBody = ({
  comment,
  isReply = false,
}: {
  comment: BaseComment;
  isReply?: boolean;
}) => {
  const { t, i18n } = useTranslation();

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    i18n.language,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className={`comment-item${isReply ? " comment-item--reply" : ""}`}>
      <div className="comment-item__header">
        <span className="comment-item__author">
          {isReply && <CornerDownRight size={12} />}
          <UserRound size={14} />
          {t("post.comments.author", "Reader")}
        </span>
        <span className="comment-item__date">{formattedDate}</span>
      </div>

      <p className="comment-item__content">{comment.content}</p>

      {comment.reactions.length > 0 && (
        <span className="comment-item__reactions">
          <Heart size={12} />
          {comment.reactions.length}
        </span>
      )}
    </div>
  );
};

export const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <li className="comment-item__wrapper">
      <CommentBody comment={comment} />

      {comment.replies.length > 0 && (
        <ul className="comment-item__replies">
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <CommentBody comment={reply} isReply />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
