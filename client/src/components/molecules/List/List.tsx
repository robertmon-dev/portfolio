import { ListItem } from "../../atoms/ListItem/ListItem";
import type { ListProps } from "./types";
import "./List.scss";

export const List = ({
  items,
  variant = "default",
  status = "default",
  className = "",
  direction = "column",
}: ListProps) => {
  const finalDirection =
    variant === "nav" || variant === "footer" ? "row" : "column";

  return (
    <ul
      className={`generic-list generic-list--${variant} generic-list--${direction || finalDirection} ${className}`}
    >
      {items.map((item) => (
        <ListItem
          key={item.id}
          variant={variant}
          status={item.status || status}
          icon={item.icon}
          href={item.href}
          isActive={item.isActive}
          disabled={item.disabled}
          onClick={item.onClick}
          className={item.className}
        >
          {item.label}
        </ListItem>
      ))}
    </ul>
  );
};

export type { ListOption } from "./types";
