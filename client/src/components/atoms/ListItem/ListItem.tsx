import { forwardRef } from "react";
import { useListItem } from "./useListItem";
import { ListItemContent } from "./ListItemContent";
import type { ListItemProps } from "./types";
import "./ListItem.scss";

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => {
    const { children, icon, href, disabled, onClick } = props;
    const {
      classes,
      handleInteraction,
      elementType,
      showIndicator,
      cleanProps,
    } = useListItem(props);

    return (
      <li ref={ref} className={classes} {...cleanProps}>
        <ListItemContent
          children={children}
          icon={icon}
          showIndicator={showIndicator}
          elementType={elementType}
          href={href}
          disabled={disabled}
          onClick={onClick}
          handleInteraction={handleInteraction}
        />
      </li>
    );
  },
);

ListItem.displayName = "ListItem";
