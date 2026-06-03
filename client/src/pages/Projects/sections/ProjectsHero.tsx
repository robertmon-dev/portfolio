import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ProjectsHero.scss";

export const ProjectsHero = () => {
  const { t } = useTranslation();

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
            "Some of my stuff, I have created, broken and repaired",
          )}
        </p>
      </motion.div>
    </section>
  );
};
