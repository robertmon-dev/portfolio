import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { usePostQueries } from "./useQueries";
import { handleScrollToTop } from "@/lib/utils/navigation";
import { Arrow } from "@/components/atoms/Arrow/Arrow";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { ErrorPage } from "@/pages/Error/Error";
import { PostHeader } from "./sections/PostHeader";
import { PostComments } from "./sections/PostComments";
import "./Post.scss";

export const PostPage = () => {
  const { t } = useTranslation();
  const { postId } = useParams<{ postId: string }>();

  const {
    get: { data: post, isLoading, isError },
  } = usePostQueries(postId ?? "");

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError || !post) return <ErrorPage code="404" />;

  return (
    <motion.div
      className="post-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="post-page__glow" />

      <div className="post-page__container">
        <Link to="/blog" className="post-page__back">
          <ArrowLeft size={16} />
          {t("post.back", "Back to blog")}
        </Link>

        <PostHeader post={post} />

        <motion.article
          className="post-page__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {post.content.split(/\n{2,}/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.article>

        {post.footer && <p className="post-page__footer-note">{post.footer}</p>}

        <PostComments postId={post.id} />

        <motion.footer
          className="post-page__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Arrow
            variant="up"
            title={t("common.scrollToTop", "Scroll to top")}
            onClick={handleScrollToTop}
          />
        </motion.footer>
      </div>
    </motion.div>
  );
};
