import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Arrow } from "@/components/atoms/Arrow/Arrow";
import { handleScrollToTop } from "@/lib/utils/navigation";
import "./PrivacyPolicy.scss";

export const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="privacy-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="privacy-page__glow" />

      <div className="privacy-page__container">
        <motion.header
          className="privacy-page__header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="privacy-page__title">{t("privacy.title")}</h1>
          <p className="privacy-page__last-updated">
            {t("privacy.lastUpdated")}
          </p>
        </motion.header>

        <motion.section
          className="privacy-page__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="privacy-page__block">
            <h2>{t("privacy.intro.title")}</h2>
            <p>{t("privacy.intro.text")}</p>
          </div>

          <div className="privacy-page__block">
            <h2>{t("privacy.data.title")}</h2>
            <p>{t("privacy.data.text")}</p>
            <ul>
              <li>
                <strong>{t("privacy.data.list.analytics")}</strong>{" "}
                {t("privacy.data.list.analyticsDesc")}
              </li>
              <li>
                <strong>{t("privacy.data.list.logs")}</strong>{" "}
                {t("privacy.data.list.logsDesc")}
              </li>
            </ul>
          </div>

          <div className="privacy-page__block">
            <h2>{t("privacy.rights.title")}</h2>
            <p>{t("privacy.rights.text")}</p>
          </div>

          <div className="privacy-page__block">
            <h2>{t("privacy.storage.title")}</h2>
            <p>{t("privacy.storage.text")}</p>
          </div>

          <div className="privacy-page__block">
            <h2>{t("privacy.cookies.title")}</h2>
            <p>{t("privacy.cookies.text")}</p>
          </div>

          <div className="privacy-page__block">
            <h2>{t("privacy.contact.title")}</h2>
            <p>{t("privacy.contact.text")}</p>
            <a href="mailto:m0ni3v@gmail.com" className="privacy-page__link">
              m0ni3v@gmail.com
            </a>
          </div>
        </motion.section>

        <motion.footer
          className="privacy-page__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Arrow
            variant="up"
            title={t("common.scrollToTop")}
            onClick={handleScrollToTop}
          />
        </motion.footer>
      </div>
    </motion.div>
  );
};
