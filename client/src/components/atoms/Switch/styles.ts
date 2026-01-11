import type { SwitchProps } from './types';
import { bem } from '../../utility/bem';

type StyleProps = Pick<SwitchProps, 'size' | 'disabled' | 'className'>;

export const getSwitchClasses = ({
  size = 'md',
  disabled,
  className,
}: StyleProps): string => {
  return bem('switch', [
    size,
    disabled && 'disabled'
  ], className);
};
