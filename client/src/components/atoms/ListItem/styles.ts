import type { ListItemStyleProps } from "./types";
import { bem } from "@/components/utility/bem";

export const getListItemClasses = ({
  variant,
  status,
  isActive,
  disabled,
  className,
}: ListItemStyleProps): string => {
  return bem(
    'list-item',
    [
      variant,
      status,
      isActive ? 'active' : null,
      disabled ? 'disabled' : null,
    ],
    className
  );
};
