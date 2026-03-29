import { useTranslation } from "react-i18next";
import { useExperienceQueries, useTechStackQueries } from "./useQueries";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { motion } from "framer-motion";
import "./About.scss";

export const AboutPage = () => {
  const { t } = useTranslation();

  const {
    list: { data: experience, isLoading: expLoading },
  } = useExperienceQueries();

  const {
    list: { data: techStack, isLoading: techLoading },
  } = useTechStackQueries();

  if (expLoading || techLoading) return <LoadingBar isLoading={true} />;

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="about-page__glow" />

      <div className="about-page__container">
        <section className="about-page__hero">
          <motion.h1
            className="about-page__title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {t("about.title")}
          </motion.h1>
          <motion.p
            className="about-page__bio"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {t("about.bio")}
          </motion.p>
        </section>

        <motion.section
          className="about-page__section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="about-page__subtitle">
            {t("about.sections.experience")}
          </h2>
        </motion.section>

        <motion.section
          className="about-page__section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="about-page__subtitle">
            {t("about.sections.techStack")}
          </h2>
        </motion.section>
      </div>
    </motion.div>
  );
};
