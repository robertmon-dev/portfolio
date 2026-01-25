import type { LoadingBarProps } from './types';
import { bem } from '../../utility/bem';

type StyleProps = Pick<LoadingBarProps, 'variant' | 'size' | 'fullWidth' | 'isLoading' | 'padding' | 'className'>;

export const getLoadingBarClasses = ({
  variant = 'default',
  size = 'md',
  fullWidth,
  isLoading,
  padding = 'md',
  className,
}: StyleProps): string => {
  return bem(
    'loading-bar',
    [
      variant,
      size,
      fullWidth && 'fullWidth',
      isLoading && 'loading',
      `padding-${padding}`,
      variant === 'purple' && 'purple'
    ],
    className
  );
};

