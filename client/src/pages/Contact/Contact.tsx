import { useTranslation } from "react-i18next";
import { useProfileQueries } from "../About/useQueries";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { motion } from "framer-motion";
import { ContactCard } from "./components/ContactCard";
import "./Contact.scss";

export const ContactPage = () => {
  const { t } = useTranslation();
  const {
    get: { data: profile, isLoading: profileLoading },
  } = useProfileQueries();

  if (profileLoading) return <LoadingBar isLoading={true} />;

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="contact-page__glow" />

      <div className="contact-page__container">
        <motion.section
          className="contact-page__section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="contact-page__subtitle">
            {t("contact.sections.getInTouch", "Get in touch")}
          </h2>

          <div className="contact-page__content">
            <p className="contact-page__text">
              {t("contact.description", "Feel free to reach out")}
            </p>

            <div className="contact-page__links">
              {profile?.email && (
                <ContactCard
                  platform={t("contact.labels.email", "Email")}
                  url={`mailto:${profile.email}`}
                  displayValue={profile.email}
                />
              )}

              {profile?.socials &&
                Object.entries(profile.socials).map(([platform, url]) => (
                  <ContactCard
                    key={platform}
                    platform={platform}
                    url={url as string}
                    displayValue={(url as string).replace(/^https?:\/\//, "")}
                  />
                ))}
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};
