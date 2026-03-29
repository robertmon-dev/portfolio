import { useTranslation } from "react-i18next";
import { useProfileQueries } from "./useQueries";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { AboutHero } from "./sections/AboutHero";
import { motion } from "framer-motion";
import "./About.scss";

export const AboutPage = () => {
  const { t } = useTranslation();
  const {
    get: { data: profile, isLoading: profileLoading },
  } = useProfileQueries();

  if (profileLoading) return <LoadingBar isLoading={true} />;

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="about-page__glow" />

      <div className="about-page__container">
        <AboutHero profile={profile} />

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
