import { bem } from '../../utility/bem'
import type { TextAreaState } from './types';

interface StyleProps {
  state: TextAreaState;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const getTextareaWrapperClasses = ({
  state,
  disabled,
  fullWidth
}: StyleProps): string => {
  return bem(
    'textarea-wrapper',
    [
      state !== 'default' ? state : null,
      disabled ? 'disabled' : null,
      fullWidth ? 'full-width' : null
    ]
  );
};
