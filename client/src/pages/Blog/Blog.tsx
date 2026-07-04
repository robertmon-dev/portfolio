import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useBlogQueries } from "./useBlogQueries";
import { handleScrollToTop } from "@/lib/utils/navigation";
import { Arrow } from "@/components/atoms/Arrow/Arrow";
import { Button } from "@/components/atoms/Button/Button";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { BlogHero } from "./section/BlogHero";
import { PostGrid } from "./section/PostCardsGrid";
import { POSTS_PER_PAGE } from "./section/consts";
import "./Blog.scss";

export const BlogPage = () => {
  const { t } = useTranslation();
  const {
    infinite: {
      data,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
  } = useBlogQueries({ limit: POSTS_PER_PAGE });

  const posts = data?.pages.flatMap((page) => page.items) || [];

  if (isLoading) return <LoadingBar isLoading={true} />;

  return (
    <motion.div
      className="blog-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="blog-page__glow" />

      <div className="blog-page__container">
        <BlogHero />

        <motion.section
          className="blog-page__section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="blog-page__subtitle">
            {t("blog.sections.posts", "Latest posts")}
          </h2>

          {posts.length > 0 ? (
            <PostGrid posts={posts} isLoading={isLoading} />
          ) : (
            <p className="blog-page__empty">
              {t("blog.empty", "No posts yet. Check back soon!")}
            </p>
          )}

          {hasNextPage && (
            <div className="blog-page__load-more">
              <Button
                variant="outline"
                size="md"
                onClick={() => void fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                {t("blog.loadMore", "Show more posts")}
              </Button>
            </div>
          )}
        </motion.section>

        <motion.footer
          className="blog-page__footer"
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
