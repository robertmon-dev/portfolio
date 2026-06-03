import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ExperienceHero.scss";

export const ExperienceHero = () => {
  const { t } = useTranslation();

  return (
    <section className="experience-hero">
      <motion.div
        className="experience-hero__content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="experience-hero__title">
          {t("experience.title", "My Experience")}
        </h1>
        <p className="experience-hero__subtitle">
          {t(
            "experience.subtitle",
            "A timeline of my professional journey, roles, and achievements.",
          )}
        </p>
      </motion.div>
    </section>
  );
};
