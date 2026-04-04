import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Arrow } from "@/components/atoms/Arrow/Arrow";
import { handleScrollDown } from "@/lib/utils/navigation";
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

      <motion.div
        className="experience-hero__scroll-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="experience-hero__scroll-text">
          {t("experience.moveDown", "Move down")}
        </p>

        <div className="experience-hero__bounce-wrapper">
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
