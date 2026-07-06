import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";
import { useAccess } from "@/hooks/useAccess";
import { usePostCommentsQueries } from "@/pages/Blog/useBlogQueries";
import { useCommentsState } from "@/pages/Blog/useCommentsState";
import { useReactionsState } from "@/pages/Blog/useReactionsState";
import { Button } from "@/components/atoms/Button/Button";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { CommentThread, type CommentNode } from "../components/CommentThread";
import { COMMENTS_PER_PAGE } from "../consts";
import type { ReactionKind } from "@portfolio/shared";
import "./PostComments.scss";

export const PostComments = ({ postId }: { postId: string }) => {
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const { can } = useAccess();
  const canComment = can("comments", "WRITE");
  const canReact = can("reactions", "WRITE");

  const [content, setContent] = useState("");

  const {
    infinite: { data, fetchNextPage, hasNextPage, isFetchingNextPage },
  } = usePostCommentsQueries({ postId, limit: COMMENTS_PER_PAGE });

  const allComments = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  const topLevelComments = useMemo(
    () => allComments.filter((comment) => !comment.isReply),
    [allComments],
  );

  const commentById = useMemo(
    () => new Map(allComments.map((comment) => [comment.id, comment])),
    [allComments],
  );

  const getChildren = useCallback(
    (comment: CommentNode): CommentNode[] => {
      if (!("replies" in comment)) return [];

      return comment.replies.map((reply) => commentById.get(reply.id) ?? reply);
    },
    [commentById],
  );

  const { state: commentState, actions: commentActions } = useCommentsState();
  const { state: reactionState, actions: reactionActions } =
    useReactionsState();
  const isCommentProcessing = !!commentState.processingId;
  const reactionProcessingId = reactionState.processingId;

  const invalidateComments = useCallback(
    () => utils.comments.listByPost.invalidate(),
    [utils],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    await commentActions.handleCreate({
      postId,
      content: trimmed,
      visibility: "USER",
      isReply: false,
      parentId: null,
    });

    setContent("");
    await invalidateComments();
  };

  const handleReply = useCallback(
    async (parentId: string, replyContent: string) => {
      await commentActions.handleCreate({
        postId,
        content: replyContent,
        visibility: "USER",
        isReply: true,
        parentId,
      });

      await invalidateComments();
    },
    [commentActions, postId, invalidateComments],
  );

  const handleReact = useCallback(
    async (commentId: string, type: ReactionKind) => {
      await reactionActions.handleCreate({ type, postId: null, commentId });
      await invalidateComments();
    },
    [reactionActions, invalidateComments],
  );

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
            disabled={isCommentProcessing}
          />
          <div className="post-comments__form-actions">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isCommentProcessing}
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

      {topLevelComments.length > 0 ? (
        <ul className="post-comments__list">
          {topLevelComments.map((comment) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              depth={0}
              getChildren={getChildren}
              onReply={handleReply}
              onReact={handleReact}
              canComment={canComment}
              canReact={canReact}
              isCommentProcessing={isCommentProcessing}
              reactionProcessingId={reactionProcessingId}
            />
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
