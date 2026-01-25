import { useState, useEffect, useRef } from 'react';

interface UseLoadingBarProps {
  isLoading: boolean;
  progressStart?: number;
  progressStep?: number;
  onStart?: () => void;
  onFinish?: () => void;
}

export const useLoadingBar = ({
  isLoading,
  progressStart = 0,
  progressStep = 5,
  onStart,
  onFinish,
}: UseLoadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      onStart?.();
      setProgress(progressStart);

      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + progressStep;
        });
      }, 400);
    } else {
      if (progress > 0) {
        setProgress(100);

        const timeout = setTimeout(() => {
          setProgress(0);
          onFinish?.();
        }, 300);

        return () => clearTimeout(timeout);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading, progressStart, progressStep]);

  return {
    progress,
    isVisible: isLoading || (progress > 0 && progress < 100),
  };
};
