import { ReactNode } from 'react';
import type { SpinnerVariant } from '@/components/atoms/Spinner/types';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T) => ReactNode;
}

export interface EntityTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  loadingVariant?: SpinnerVariant;
  onRowClick?: (item: T) => void;
  className?: string;
}
