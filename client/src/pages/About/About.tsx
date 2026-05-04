import { useTranslation } from "react-i18next";
import {
  useExperienceQueries,
  useGithubCommitQueries,
  useProfileQueries,
  useTechStackQueries,
} from "./useQueries";
import { Button } from "@/components/atoms/Button/Button";
import { LatestCommits } from "./sections/LatestCommits";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { AboutHero } from "./sections/AboutHero";
import { ExperienceTimeline } from "./sections/ExperienceTimeline";
import { TechStackGrid } from "./sections/TechStackGrid";
import { motion } from "framer-motion";
import "./About.scss";

export const AboutPage = () => {
  const { t } = useTranslation();
  const {
    get: { data: profile, isLoading: profileLoading },
  } = useProfileQueries();

  const {
    list: { data: experience },
  } = useExperienceQueries();

  const {
    list: { data: techStack, isLoading },
  } = useTechStackQueries();

  const {
    infinite: { data, fetchNextPage, hasNextPage, isFetchingNextPage },
  } = useGithubCommitQueries(3);
  const allCommits = data?.pages.flatMap((page) => page.items) || [];

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
          <ExperienceTimeline items={experience || []} />
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
          <TechStackGrid items={techStack || []} isLoading={isLoading} />
        </motion.section>

        <motion.section
          className="about-page__section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="about-page__subtitle">
            {t("about.sections.commits", "Latest commits")}
          </h2>
          <LatestCommits items={allCommits} />
          {hasNextPage && (
            <div className="about-page__load-more">
              <Button
                variant="outline"
                size="md"
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                {t("about.commits.loadMore", "Show more activity")}
              </Button>
            </div>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
};
