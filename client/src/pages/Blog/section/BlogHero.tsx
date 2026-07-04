import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./BlogHero.scss";

export const BlogHero = () => {
  const { t } = useTranslation();

  return (
    <section className="blog-hero">
      <motion.div
        className="blog-hero__content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="blog-hero__title">{t("blog.title", "Blog")}</h1>
        <p className="blog-hero__subtitle">
          {t(
            "blog.subtitle",
            "Notes on things I have built, broken and figured out along the way",
          )}
        </p>
      </motion.div>
    </section>
  );
};
