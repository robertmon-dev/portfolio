import { memo, useMemo } from "react";
import type { TechIconProps } from "./types";
import { getTechIcon } from "@/lib/utils/render";
import "./Icon.scss";

export const TechIcon = memo(({ name, color, size = 20 }: TechIconProps) => {
  const IconComponent = useMemo(() => getTechIcon(name), [name]);

  return (
    <div className="tech-icon" style={{ color: color || "inherit" }}>
      <IconComponent size={size} />
    </div>
  );
});

TechIcon.displayName = "TechIcon";
