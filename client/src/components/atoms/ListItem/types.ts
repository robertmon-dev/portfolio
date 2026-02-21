import type { ReactNode, MouseEvent as ReactMouseEvent, LiHTMLAttributes } from 'react';

export type ListItemVariant = 'default' | 'nav' | 'footer' | 'side';
export type ListItemStatus = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface ListItemStyleProps {
  variant?: ListItemVariant;
  status?: ListItemStatus;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ListItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'onClick'>, ListItemStyleProps {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: ReactMouseEvent<HTMLElement>) => void;
}

export interface ListItemContentProps {
  children: ReactNode;
  icon?: ReactNode;
  showIndicator?: boolean;
  elementType: 'div' | 'a' | 'link';
  href?: string;
  disabled?: boolean;
  onClick?: (e: ReactMouseEvent<HTMLElement>) => void;
  handleInteraction: (e: ReactMouseEvent<HTMLElement>) => void;
}
