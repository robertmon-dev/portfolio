import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useTranslation();

  const copyToClipboard = useCallback(
    (text: string) => {
      if (!navigator?.clipboard) {
        toast.error(
          t(
            "common.copy.errors.notSupported",
            "Your browser does not support copying to the clipboard.",
          ),
        );
        return;
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);

          setTimeout(() => setIsCopied(false), timeout);
        })
        .catch(() => {
          toast.error(
            t(
              "common.copy.errors.failed",
              "Failed to copy text to the clipboard.",
            ),
          );
          setIsCopied(false);
        });
    },
    [timeout, t],
  );

  return { isCopied, copyToClipboard };
}
