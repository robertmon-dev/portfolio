import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Eye, Calendar, UserRound } from "lucide-react";
import { Tag } from "@/components/atoms/Tag/Tag";
import type { Post } from "@portfolio/shared";
import "./PostHeader.scss";

export const PostHeader = ({ post }: { post: Post }) => {
  const { t, i18n } = useTranslation();

  const formattedDate = new Date(
    post.publishedAt ?? post.createdAt,
  ).toLocaleDateString(i18n.language, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.header
      className="post-header"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {post.coverImageUrl && (
        <div className="post-header__cover">
          <img src={post.coverImageUrl} alt={post.title} />
        </div>
      )}

      <h1 className="post-header__title">{post.title}</h1>

      {post.subtitle && (
        <p className="post-header__subtitle">{post.subtitle}</p>
      )}

      <div className="post-header__meta">
        <span className="post-header__meta-item">
          <UserRound size={14} />
          {post.author
            ? post.author.name
            : t("blog.post.defaultAuthor", "Article")}
        </span>
        <span className="post-header__meta-item">
          <Calendar size={14} />
          {formattedDate}
        </span>
        <span className="post-header__meta-item">
          <Eye size={14} />
          {t("blog.post.views", "{{count}} views", { count: post.viewCount })}
        </span>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-header__tags">
          {post.tags.map((tag) => (
            <Tag key={tag.id} size="sm" variant="primary">
              #{tag.name}
            </Tag>
          ))}
        </div>
      )}
    </motion.header>
  );
};
