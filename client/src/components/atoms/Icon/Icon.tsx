import type { TechIconProps } from "./types";
import "./Icon.scss";

export const TechIcon = ({ icon, color }: TechIconProps) => {
  if (!icon) return null;

  const isClassIcon = icon.includes("-");

  return (
    <div
      className="tech-icon"
      style={
        { "--icon-color": color || "var(--primary)" } as React.CSSProperties
      }
    >
      {isClassIcon ? (
        <i className={`${icon} tech-icon__glyph`} />
      ) : (
        <span className="tech-icon__fallback">?</span>
      )}
    </div>
  );
};
