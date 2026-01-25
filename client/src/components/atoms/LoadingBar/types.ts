import type { HTMLAttributes } from 'react';

export type LoadingBarVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'cyan';
export type LoadingBarSize = 'sm' | 'md' | 'lg';
export type LoadingBarPadding = 'sm' | 'md' | 'lg';

export interface LoadingBarProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LoadingBarVariant;
  fullWidth?: boolean;
  size?: LoadingBarSize;
  padding?: LoadingBarPadding;
  onFinish?: () => void;
  onStart?: () => void;
  clickable?: boolean;
  onClick?: () => void;
  progressStart?: number;
  progressStep?: number;
  isLoading: boolean;
}
