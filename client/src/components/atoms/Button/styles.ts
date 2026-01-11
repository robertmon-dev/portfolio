import type { ButtonProps } from './types';
import { bem } from '../../utility/bem'; // Importujemy generyk

type StyleProps = Pick<ButtonProps, 'variant' | 'size' | 'fullWidth' | 'isLoading' | 'className'>;

export const getButtonClasses = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  isLoading,
  className,
}: StyleProps): string => {
  return bem(
    'btn',
    [
      variant,
      size,
      fullWidth && 'full-width',
      isLoading && 'loading'
    ],
    className
  );
};
