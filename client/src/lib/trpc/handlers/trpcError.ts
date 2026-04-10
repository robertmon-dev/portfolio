import { TRPCClientError } from "@trpc/client";
import { NETWORK_ERROR_MESSAGES } from "@portfolio/shared";
import i18n from "@/i18n";
import { navigateTo } from "@/lib/utils/navigation";
import { toast } from "react-toastify";

const toCamelCase = (str: string) =>
  str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());

export const handleTrpcError = (error: unknown) => {
  const isNetwork =
    error instanceof Error &&
    NETWORK_ERROR_MESSAGES.some((msg) => error.message.includes(msg));
  if (isNetwork) {
    return {
      code: "NETWORK_ERROR",
      message: i18n.t("errors.offline.title"),
      isCritical: true,
    };
  }

  if (error instanceof TRPCClientError) {
    const code = error.data?.code || "UNKNOWN_ERROR";
    const cause = error.data?.cause as { retryAfter?: number } | undefined;
    const seconds = cause?.retryAfter;

    const translationKeys = [
      `errors.${toCamelCase(code)}`,
      `errors.codes.${code}`,
      "errors.default",
    ];

    const message = i18n.t(translationKeys, {
      seconds,
      count: seconds,
      defaultValue: error.message,
    });

    const isCritical = ["INTERNAL_SERVER_ERROR", "TIMEOUT"].includes(code);

    return { code, message, isCritical };
  }

  return {
    code: "UNKNOWN",
    message: i18n.t("errors.default"),
    isCritical: false,
  };
};

export const notifyError = (error: unknown) => {
  const { code, message, isCritical } = handleTrpcError(error);

  if (code === "UNAUTHORIZED") {
    localStorage.removeItem("token");
  }

  if (isCritical) {
    const target = code === "NETWORK_ERROR" ? "offline" : "500";
    navigateTo(`/error/${target}`);
    return;
  }

  if (message && code !== "UNAUTHORIZED") {
    toast.error(message, { toastId: code });
  }
};
