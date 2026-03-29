import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/atoms/Card/Card";
import type { AboutHeroProps } from "../types";
import "./AboutHero.scss";

export const AboutHero = ({ profile }: AboutHeroProps) => {
  const { t } = useTranslation();

  return (
    <section className="about-page__hero">
      <motion.h1
        className="about-page__title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {profile?.name || t("about.title")}
      </motion.h1>

      {profile?.headline && (
        <p className="about-page__headline">{profile.headline}</p>
      )}

      <motion.p
        className="about-page__bio"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {profile?.bio || t("about.bio")}
      </motion.p>

      {profile?.socials && (
        <div className="about-page__socials">
          {Object.entries(profile.socials).map(([platform, url], index) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card
                variant="levitating"
                interactive
                padding="none"
                className="about-page__social-card"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-page__social-link"
                >
                  <span className="about-page__social-name">{platform}</span>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
