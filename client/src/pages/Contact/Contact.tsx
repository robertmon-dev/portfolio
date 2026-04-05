import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { motion } from "framer-motion";
import { useProfileQueries } from "../About/useQueries";
import { useTranslation } from "react-i18next";

export const ContactPage = () => {
  const { t } = useTranslation();
  const {
    get: { data: profile, isLoading: profileLoading },
  } = useProfileQueries();

  if (profileLoading) return <LoadingBar isLoading={true} />;

  return <motion.div></motion.div>;
};
