import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";
import { useAccess } from "@/hooks/useAccess";
import { usePostReactionsQueries } from "@/pages/Blog/useBlogMutations";
import { useReactionsState } from "@/pages/Blog/useReactionsState";
import { REACTION_TYPE, type ReactionKind } from "@portfolio/shared";
import { REACTION_EMOJI } from "../consts";
import "./PostReactions.scss";

export const PostReactions = ({ postId }: { postId: string }) => {
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const { can } = useAccess();
  const canReact = can("reactions", "WRITE");

  const { data: reactions } = usePostReactionsQueries(postId);
  const { state, actions } = useReactionsState();
  const isProcessing = !!state.processingId;

  const counts = useMemo(() => {
    const map = Object.fromEntries(
      REACTION_TYPE.map((type) => [type, 0]),
    ) as Record<ReactionKind, number>;

    reactions?.forEach((reaction) => {
      map[reaction.type] += 1;
    });

    return map;
  }, [reactions]);

  const handleReact = async (type: ReactionKind) => {
    await actions.handleCreate({ type, postId, commentId: null });
    await utils.reactions.listByPost.invalidate({ id: postId });
    await utils.posts.getById.invalidate({ id: postId });
  };

  return (
    <motion.section
      className="post-reactions"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="post-reactions__list">
        {REACTION_TYPE.map((type) => (
          <button
            key={type}
            type="button"
            className="post-reactions__button"
            onClick={() => void handleReact(type)}
            disabled={!canReact || isProcessing}
            title={
              canReact
                ? type
                : t("post.reactions.loginPrompt", "Sign in to react")
            }
          >
            <span className="post-reactions__emoji">
              {REACTION_EMOJI[type]}
            </span>
            <span className="post-reactions__count">{counts[type]}</span>
          </button>
        ))}
      </div>

      {!canReact && (
        <p className="post-reactions__hint">
          {t("post.reactions.loginPrompt", "Sign in to react")}
        </p>
      )}
    </motion.section>
  );
};
