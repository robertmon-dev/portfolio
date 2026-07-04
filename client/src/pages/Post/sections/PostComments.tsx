import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";
import { useAccess } from "@/hooks/useAccess";
import { usePostCommentsQueries } from "@/pages/Blog/useBlogQueries";
import { useCommentsState } from "@/pages/Blog/useCommentsState";
import { Button } from "@/components/atoms/Button/Button";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { CommentItem } from "../components/CommentItem";
import { COMMENTS_PER_PAGE } from "../consts";
import "./PostComments.scss";

export const PostComments = ({ postId }: { postId: string }) => {
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const { can } = useAccess();
  const canComment = can("comments", "WRITE");

  const [content, setContent] = useState("");

  const {
    infinite: { data, fetchNextPage, hasNextPage, isFetchingNextPage },
  } = usePostCommentsQueries({ postId, limit: COMMENTS_PER_PAGE });
  const comments = data?.pages.flatMap((page) => page.items) ?? [];

  const { state, actions } = useCommentsState();
  const isProcessing = !!state.processingId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    await actions.handleCreate({
      postId,
      content: trimmed,
      visibility: "USER",
      isReply: false,
      parentId: null,
    });

    setContent("");
    await utils.comments.listByPost.invalidate();
  };

  return (
    <motion.section
      className="post-comments"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="post-comments__title">
        {t("post.sections.comments", "Comments")}
      </h2>

      {canComment ? (
        <form
          className="post-comments__form"
          onSubmit={(e) => void handleSubmit(e)}
        >
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("post.comments.placeholder", "Write a comment...")}
            rows={3}
            fullWidth
            disabled={isProcessing}
          />
          <div className="post-comments__form-actions">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isProcessing}
              disabled={!content.trim()}
            >
              {t("post.comments.submit", "Post comment")}
            </Button>
          </div>
        </form>
      ) : (
        <p className="post-comments__login-prompt">
          {t("post.comments.loginPrompt", "Sign in to join the discussion")}
        </p>
      )}

      {comments.length > 0 ? (
        <ul className="post-comments__list">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p className="post-comments__empty">
          {t("post.comments.empty", "No comments yet. Be the first!")}
        </p>
      )}

      {hasNextPage && (
        <div className="post-comments__load-more">
          <Button
            variant="outline"
            size="md"
            onClick={() => void fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            {t("post.comments.loadMore", "Show more comments")}
          </Button>
        </div>
      )}
    </motion.section>
  );
};
