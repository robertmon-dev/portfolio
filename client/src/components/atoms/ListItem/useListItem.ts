import type { MouseEvent } from 'react';
import { getListItemClasses } from './styles';
import type { ListItemProps } from './types';

export const useListItem = (props: ListItemProps) => {
  const {
    children,
    icon,
    href,
    isActive = false,
    variant = 'default',
    status,
    disabled = false,
    className = '',
    external = false,
    onClick,
    ...cleanProps
  } = props;

  const classes = getListItemClasses({ variant, status, isActive, disabled, className });
  const handleInteraction = (e: MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const showIndicator = isActive && (variant === 'nav' || variant === 'side');

  let elementType: 'div' | 'a' | 'link' = 'div';
  if (href) {
    elementType = external ? 'a' : 'link';
  }

  return {
    classes,
    handleInteraction,
    elementType,
    showIndicator,
    cleanProps
  };
};
