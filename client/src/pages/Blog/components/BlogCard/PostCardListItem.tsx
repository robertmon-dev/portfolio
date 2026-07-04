import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/atoms/Card/Card";
import type { Post } from "@portfolio/shared";
import "./PostCardListItem.scss";
import { useTranslation } from "react-i18next";

export const PostCardListItem = memo(
  ({ post, index }: { post: Post; index: number }) => {
    const { t, i18n } = useTranslation();

    const formattedDate = new Date(post.createdAt).toLocaleDateString(
      i18n.language,
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    );

    const MotionTag = motion.div;

    return (
      <MotionTag
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 5) * 0.1, duration: 0.4 }}
      >
        <Card
          variant="transparent"
          padding="md"
          hover={true}
          interactive={true}
          className="post-card__item"
        >
          <div className="post-card__header">
            <span className="post-card__meta">
              {post.author
                ? post.author.name
                : t("blog.post.defaultAuthor", "Artykuł")}
            </span>
            <span className="post-card__date">{formattedDate}</span>
          </div>

          <h3 className="post-card__title">{post.title}</h3>

          {post.subtitle && (
            <p className="post-card__subtitle">{post.subtitle}</p>
          )}

          {post.excerpt && <p className="post-card__excerpt">{post.excerpt}</p>}

          <div className="post-card__footer">
            <span className="post-card__badge">
              {t("blog.post.views", "{{count}} views", {
                count: post.viewCount,
              })}
            </span>
          </div>
        </Card>
      </MotionTag>
    );
  },
);

PostCardListItem.displayName = "PostCardListItem";
