import { ReactNode } from 'react';
import { ListItemVariant, ListItemStatus } from '../../atoms/ListItem/types';

export interface ListOption {
  id: string | number;
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  status?: ListItemStatus;
  className?: string;
}

export interface ListProps {
  items: ListOption[];
  variant?: ListItemVariant;
  status?: ListItemStatus;
  className?: string;
  direction?: 'row' | 'column';
}
