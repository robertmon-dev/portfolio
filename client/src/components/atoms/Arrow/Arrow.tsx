import { useMemo } from "react";
import {
  Info,
  Swords,
  Play,
  Pause,
  ArrowBigDown,
  ArrowBigUp,
} from "lucide-react";
import type { ArrowProps } from "./types";
import "./Arrow.scss";

export const Arrow = ({
  variant = "info",
  title,
  children,
  onClick,
  className = "",
}: ArrowProps) => {
  const Icon = useMemo(() => {
    switch (variant) {
      case "info":
        return Info;
      case "start":
        return Play;
      case "stop":
        return Pause;
      case "up":
        return ArrowBigUp;
      case "down":
        return ArrowBigDown;
      default:
        return Swords;
    }
  }, [variant]);

  return (
    <button
      type="button"
      className={`arrow-btn variant-${variant} ${className}`.trim()}
      onClick={onClick}
      aria-label={title}
      title={title}
    >
      <Icon className="arrow-icon" aria-hidden="true" />
      {children && <span className="arrow-content">{children}</span>}
    </button>
  );
};
