import { TRPCClientError } from "@trpc/client";
import { NETWORK_ERROR_MESSAGES } from "@portfolio/shared";
import i18n from "@/i18n";
import { navigateTo } from "@/lib/utils/navigation";
import { toast } from "react-toastify";

export const handleTrpcError = (error: unknown) => {
  const isNetworkError =
    error instanceof Error &&
    NETWORK_ERROR_MESSAGES.some((msg) => error.message.includes(msg));

  if (isNetworkError) {
    return {
      code: "NETWORK_ERROR",
      message: i18n.t("errors.codes.NETWORK_ERROR"),
      isCritical: true,
    };
  }

  if (error instanceof TRPCClientError) {
    const code = error.data?.code || "UNKNOWN_ERROR";
    const cause = error.data?.cause;
    const retryAfter = cause?.retryAfter;

    const criticalCodes = ["INTERNAL_SERVER_ERROR", "TIMEOUT"];
    const isCritical = criticalCodes.includes(code);

    const translationKey = `errors.codes.${code}`;
    const message = i18n.exists(translationKey)
      ? i18n.t(translationKey, { count: retryAfter, seconds: retryAfter })
      : error.message || i18n.t("errors.codes.UNKNOWN_ERROR");

    return { code, message, isCritical };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: i18n.t("errors.codes.UNKNOWN_ERROR"),
    isCritical: false,
  };
};

export const notifyError = (error: unknown) => {
  const { code, message, isCritical } = handleTrpcError(error);

  if (code === "UNAUTHORIZED") {
    localStorage.removeItem("token");
  }

  if (isCritical) {
    const targetCode = code === "NETWORK_ERROR" ? "offline" : "500";
    navigateTo(`/error/${targetCode}`);
    return;
  }

  if (message && code !== "UNAUTHORIZED") {
    toast.error(message);
  }
};
