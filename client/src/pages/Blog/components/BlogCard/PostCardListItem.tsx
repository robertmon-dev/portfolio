import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/atoms/Card/Card";
import { Tag } from "@/components/atoms/Tag/Tag";
import type { Post } from "@portfolio/shared";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Eye, MessageCircle, Heart } from "lucide-react";
import "./PostCardListItem.scss";

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

    const commentsCount = post.comments?.length || post.commentIds?.length || 0;
    const reactionsCount =
      post.reactions?.length || post.reactionIds?.length || 0;

    return (
      <MotionTag
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 5) * 0.1, duration: 0.4 }}
      >
        <Link to={`/post/${post.id}`} className="post-card__wrapper">
          <Card
            variant="transparent"
            padding="md"
            hover={true}
            interactive={true}
            className="post-card__item"
          >
            {post.coverImageUrl && (
              <div className="post-card__cover">
                <img src={post.coverImageUrl} alt={post.title} loading="lazy" />
              </div>
            )}

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

            {post.excerpt && (
              <p className="post-card__excerpt">{post.excerpt}</p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="post-card__tags">
                {post.tags.map((tag) => (
                  <Tag key={tag.id} size="sm" variant="primary">
                    #{tag.name}
                  </Tag>
                ))}
              </div>
            )}

            <div className="post-card__footer">
              <span className="post-card__badge">
                <Eye size={14} className="post-card__icon" />
                {t("blog.post.views", "{{count}} views", {
                  count: post.viewCount,
                })}
              </span>

              {commentsCount > 0 && (
                <span className="post-card__badge post-card__badge--secondary">
                  <MessageCircle size={14} className="post-card__icon" />
                  {commentsCount}
                </span>
              )}

              {reactionsCount > 0 && (
                <span className="post-card__badge post-card__badge--secondary">
                  <Heart size={14} className="post-card__icon" />
                  {reactionsCount}
                </span>
              )}
            </div>
          </Card>
        </Link>
      </MotionTag>
    );
  },
);

PostCardListItem.displayName = "PostCardListItem";
