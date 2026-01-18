import { LiHTMLAttributes, ReactNode } from 'react';

export type ListItemVariant = 'default' | 'nav' | 'footer' | 'side';
export type ListItemStatus = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  isActive?: boolean;
  variant?: ListItemVariant;
  status?: ListItemStatus;
  disabled?: boolean;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export interface ListItemStyleProps {
  variant?: ListItemVariant;
  status?: ListItemStatus;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}
