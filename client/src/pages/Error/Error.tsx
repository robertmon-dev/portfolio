import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { ERROR_CONFIG } from "./consts";
import type { ErrorPageProps } from "./types";
import "./Error.scss";

export const ErrorPage = ({
  code = '404',
  title,
  message
}: ErrorPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { icon: Icon, titleKey, descKey } = ERROR_CONFIG[code];

  return (
    <div className={`error-page error-page--${code}`}>
      <div className="error-page__container">
        <motion.div
          className="error-page__icon-wrapper"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <Icon size={80} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          className="error-page__code"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {code}
        </motion.h1>

        <div className="error-page__text">
          <h2 className="error-page__title">
            {title || t(titleKey)}
          </h2>
          <p className="error-page__description">
            {message || t(descKey)}
          </p>
        </div>

        <div className="error-page__actions">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={18} />}
            onClick={() => navigate(-1)}
          >
            {t("common.go_back", "Go Back")}
          </Button>

          <Button
            variant="primary"
            leftIcon={<Home size={18} />}
            onClick={() => navigate("/")}
          >
            {t("common.back_home", "Back Home")}
          </Button>
        </div>
      </div>

      <div className="error-page__glow" aria-hidden="true" />
    </div>
  );
};
