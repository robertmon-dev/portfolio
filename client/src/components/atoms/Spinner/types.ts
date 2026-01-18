export type SpinnerVariant = 'default' | 'dots' | 'hash' | 'bar' | 'beat';

export interface SpinnerCommonProps {
  color: string;
  size?: number;
  width?: number;
  margin?: number;
  loading?: boolean;
}

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: number;
  color?: string;
  className?: string;
}
