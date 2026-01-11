import type { CardProps } from './types';
import { bem } from '../../utility/bem';

type StyleProps = Pick<CardProps, 'variant' | 'padding' | 'interactive' | 'className'>;

export const getCardClasses = ({
  variant = 'elevated',
  padding = 'md',
  interactive,
  className,
}: StyleProps): string => {
  return bem(
    'card',
    [
      variant,
      `padding-${padding}`,
      interactive && 'interactive',
      variant === 'levitating' && 'levitating'
    ],
    className
  );
};
