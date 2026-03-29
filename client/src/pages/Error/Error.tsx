import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { ERROR_CONFIG } from "./consts";
import type { ErrorCode, ErrorPageProps } from "./types";
import "./Error.scss";

export const ErrorPage = ({
  code: propCode,
  title: propTitle,
  message: propMessage,
}: ErrorPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { code: urlCode } = useParams<{ code: string }>();

  const code = (propCode || urlCode || "404") as ErrorCode;

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
          <Icon size={160} strokeWidth={1} />
        </motion.div>

        <div className="error-page__content">
          <motion.h1
            className="error-page__code"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {code === "offline" ? "ERR" : code}
          </motion.h1>

          <motion.div
            className="error-page__text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="error-page__title">
              {propTitle || t(config.titleKey, "Something went wrong")}
            </h2>
            <p className="error-page__description">
              {propMessage ||
                t(config.descKey, "The server is currently unreachable.")}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="error-page__actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <div className="error-page__button-content">
              <ArrowLeft size={18} />
              {t("common.go_back", "Go Back")}
            </div>
          </Button>

          <Button variant="primary" onClick={() => navigate("/")}>
            <div className="error-page__button-content">
              <Home size={18} />
              {t("common.back_home", "Home")}
            </div>
          </Button>
        </motion.div>
      </div>

      <div className="error-page__glow" />
    </div>
  );
};
