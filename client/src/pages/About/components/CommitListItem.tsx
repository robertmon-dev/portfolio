import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/atoms/Card/Card";
import type { GithubCommit } from "@portfolio/shared";
import "./CommitListItem.scss";

export const CommitListItem = memo(
  ({ commit, index }: { commit: GithubCommit; index: number }) => {
    const shortSha = commit.sha ? commit.sha.substring(0, 7) : "N/A";

    const formattedDate = new Date(commit.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const MotionTag = commit.url ? motion.a : motion.div;
    const linkProps = commit.url
      ? {
          href: commit.url,
          target: "_blank",
          rel: "noopener noreferrer",
          style: { textDecoration: "none", display: "block" },
        }
      : {};

    return (
      <MotionTag
        {...linkProps}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 5) * 0.1, duration: 0.4 }}
      >
        <Card
          variant="levitating-transparent"
          padding="md"
          interactive={!!commit.url}
          className="latest-commits__item"
        >
          <div className="latest-commits__header">
            <span className="latest-commits__repo">
              {commit.repo?.name || "unknown-repo"}
            </span>
            <span className="latest-commits__date">{formattedDate}</span>
          </div>

          <h3 className="latest-commits__message">{commit.message}</h3>

          {commit.description && (
            <p className="latest-commits__description">{commit.description}</p>
          )}

          <div className="latest-commits__footer">
            <span className="latest-commits__sha">{shortSha}</span>
          </div>
        </Card>
      </MotionTag>
    );
  },
);

CommitListItem.displayName = "CommitListItem";
