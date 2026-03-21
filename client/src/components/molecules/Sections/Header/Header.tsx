import { Tag } from "../../../atoms/Tag/Tag";
import type { HeaderProps } from "./types";
import { formatTagContent } from "./utils";
import "./Header.scss";

export const Header = ({ title, subtitle, tags, action }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__main-section">
        <div className="header__content">
          <h1 className="header__title">{title}</h1>
          {subtitle && <p className="header__subtitle">{subtitle}</p>}
        </div>

        {action && <div className="header__action">{action}</div>}
      </div>

      <div className="header__tags-container">
        {tags.map(({ id, children, className, ...tagProps }) => (
          <Tag
            key={id}
            size="sm"
            maxLength={200}
            {...tagProps}
            className={`header__tag-item ${className || ""}`.trim()}
          >
            {formatTagContent(children)}
          </Tag>
        ))}
      </div>
    </header>
  );
};
