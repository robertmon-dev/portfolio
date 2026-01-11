import type { InputProps } from './types';
import { bem } from '../../utility/bem';

type StyleProps = Pick<InputProps, 'error' | 'fullWidth' | 'disabled' | 'className'>;

export const getInputWrapperClasses = ({
  error,
  fullWidth,
  disabled,
}: StyleProps): string => {
  return bem('input-wrapper', [
    !!error && 'error',
    disabled && 'disabled',
    fullWidth && 'full-width'
  ]);
};
