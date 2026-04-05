import type { TechIconProps } from "./types";
import { getTechIcon } from "@/lib/utils/render";
import "./Icon.scss";

export const TechIcon = ({ name, color, size = 20 }: TechIconProps) => {
  const IconComponent = getTechIcon(name);

  return (
    <div className="tech-icon" style={{ color: color || "inherit" }}>
      <IconComponent size={size} />
    </div>
  );
};
