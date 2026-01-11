import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    if (!navigator?.clipboard) {
      toast.error('Twoja przeglądarka nie obsługuje kopiowania do schowka.');
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => setIsCopied(false), timeout);
      })
      .catch(() => {
        toast.error('Nie udało się skopiować tekstu do schowka.');
        setIsCopied(false);
      });
  }, [timeout]);

  return { isCopied, copyToClipboard };
}
