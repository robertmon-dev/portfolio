import type { ReactNode } from 'react';
import type { TagProps } from '../../../atoms/Tag/types';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  tags: (Omit<TagProps, 'id'> & { id: number | string })[];
  action?: ReactNode;
}
