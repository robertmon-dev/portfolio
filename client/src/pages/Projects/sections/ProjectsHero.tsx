import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Arrow } from "@/components/atoms/Arrow/Arrow";
import "./ProjectsHero.scss";

export const ProjectsHero = () => {
  const { t } = useTranslation();

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <section className="projects-hero">
      <motion.div
        className="projects-hero__content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="projects-hero__title">
          {t("projects.title", "My Projects")}
        </h1>
        <p className="projects-hero__subtitle">
          {t(
            "projects.subtitle",
            "Some of my stuff, I have createn, broken and repaired",
          )}
        </p>
      </motion.div>
      <motion.div
        className="projects-hero__scroll-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="projects-hero__scroll-text">
          {t("projects.moveDown", "Move down")}
        </p>

        <div className="projects-hero__bounce-wrapper">
          <Arrow
            variant="down"
            title={t("common.scrollDown", "Scroll down")}
            onClick={handleScrollDown}
          />
        </div>
      </motion.div>
    </section>
  );
};
