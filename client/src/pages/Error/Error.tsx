import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { ERROR_CONFIG } from "./consts";
import type { ErrorPageProps } from "./types";
import "./Error.scss";

export const ErrorPage = ({ code = "404", title, message }: ErrorPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const config = ERROR_CONFIG[code] || {
    icon: AlertTriangle,
    titleKey: "errors.default.title",
    descKey: "errors.default.description",
  };

  const Icon = config.icon;

  return (
    <div className={`error-page error-page--${code}`}>
      <div className="error-page__container">
        <motion.div
          className="error-page__icon-wrapper"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <Icon size={220} strokeWidth={1} />
        </motion.div>

        <div className="error-page__content">
          <motion.h1
            className="error-page__code"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {code}
          </motion.h1>

          <motion.div
            className="error-page__text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="error-page__title">
              {title || t(config.titleKey, "Something went wrong")}
            </h2>
            <p className="error-page__description">
              {message ||
                t(
                  config.descKey,
                  "The page you are looking for doesn't exist.",
                )}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="error-page__actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <span className="error-page__button-content">
              <ArrowLeft size={18} />
              {t("common.go_back", "Go Back")}
            </span>
          </Button>

          <Button variant="primary" onClick={() => navigate("/")}>
            <span className="error-page__button-content">
              <Home size={18} />
              {t("common.back_home", "Home")}
            </span>
          </Button>
        </motion.div>
      </div>

      <div className="error-page__glow error-page__glow--1" />
      <div className="error-page__glow error-page__glow--2" />
    </div>
  );
};
