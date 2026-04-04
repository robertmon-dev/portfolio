import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useExperienceQueries } from "../About/useQueries";
import { Arrow } from "@/components/atoms/Arrow/Arrow";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { ExperienceTimeline } from "../About/sections/ExperienceTimeline";
import { ExperienceHero } from "./sections/ExperienceHero";
import { handleScrollToTop } from "@/lib/utils/navigation";
import "./Experience.scss";

export const ExperiencePage = () => {
  const { t } = useTranslation();
  const {
    list: { data: experience, isLoading },
  } = useExperienceQueries();

  if (isLoading) return <LoadingBar isLoading={true} />;

  return (
    <motion.div
      className="experience-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="experience-page__glow" />

      <div className="experience-page__container">
        <ExperienceHero />

        <motion.section
          className="experience-page__section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="experience-page__subtitle">
            {t("experience.sections.timeline", "Timeline")}
          </h2>
        </motion.section>

        <ExperienceTimeline items={experience || []} />

        <motion.footer
          className="experience-page__footer"
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
