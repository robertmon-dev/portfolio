import { Link } from "react-router-dom";
import type { ListItemContentProps } from "./types";

export const ListItemContent = ({
  children,
  icon,
  showIndicator,
  elementType,
  href,
  disabled,
  onClick,
  handleInteraction,
}: ListItemContentProps) => {
  const content = (
    <>
      {icon && <span className="list-item__icon">{icon}</span>}
      <span className="list-item__text">{children}</span>
      {showIndicator && <span className="list-item__indicator" />}
    </>
  );

  if (elementType === "div") {
    return (
      <div
        className="list-item__content"
        onClick={disabled ? undefined : (onClick as any)}
      >
        {content}
      </div>
    );
  }

  if (elementType === "a") {
    return (
      <a
        href={href}
        className="list-item__link"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleInteraction}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href!} className="list-item__link" onClick={handleInteraction}>
      {content}
    </Link>
  );
};
