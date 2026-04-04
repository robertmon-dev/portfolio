import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useProjectQueries } from "./useQueries";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { ProjectsHero } from "./sections/ProjectsHero";
import { ProjectsTimeline } from "./sections/ProjectsTimeline";
import "./Projects.scss";

export const Projects = () => {
  const { t } = useTranslation();
  const {
    list: { data: projects, isLoading: areProjectsLoading },
  } = useProjectQueries();

  if (areProjectsLoading) return <LoadingBar isLoading={true} />;

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="projects-page__glow" />

      <div className="projects-page__container">
        <ProjectsHero />

        <motion.section
          className="projects-page__section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="projects-page__subtitle">
            {t("projects.sections.timeline", "Timeline")}
          </h2>

          <ProjectsTimeline items={projects || []} />
        </motion.section>
      </div>
    </motion.div>
  );
};
