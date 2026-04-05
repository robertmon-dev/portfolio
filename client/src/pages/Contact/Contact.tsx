import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProfileQueries } from "../About/useQueries";
import { motion } from "framer-motion";
import { EntityGrid } from "@/components/molecules/EntityGrid/EntityGrid";
import { ContactCard } from "./components/ContactCard";
import "./Contact.scss";

export const ContactPage = () => {
  const { t } = useTranslation();
  const {
    get: { data: profile, isLoading: profileLoading },
  } = useProfileQueries();

  const contactData = useMemo(() => {
    const items = [];

    if (profile?.email) {
      items.push({
        id: "email",
        platform: t("contact.labels.email", "Email"),
        url: `mailto:${profile.email}`,
        displayValue: profile.email,
      });
    }

    if (profile?.socials) {
      Object.entries(profile.socials).forEach(([platform, url]) => {
        items.push({
          id: platform,
          platform: platform,
          url: url,
          displayValue: url.replace(/^https?:\/\//, ""),
        });
      });
    }

    return items;
  }, [profile, t]);

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

            <EntityGrid
              data={contactData}
              isLoading={profileLoading}
              loadingItemsCount={4}
              columns={{ default: 1, md: 2, lg: 3 }}
              gap="1.5rem"
              renderItem={(item) => (
                <ContactCard
                  platform={item.platform}
                  url={item.url}
                  displayValue={item.displayValue}
                />
              )}
            />
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};
