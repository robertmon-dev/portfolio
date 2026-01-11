import { bem } from '../../utility/bem';
import type { TextDisplayState } from './types';

interface StyleProps {
  state: TextDisplayState;
  fullWidth?: boolean;
}

export const getTextDisplayWrapperClasses = ({
  state,
  fullWidth
}: StyleProps): string => {
  return bem(
    'text-display-wrapper',
    [
      state !== 'default' ? state : null,
      fullWidth ? 'full-width' : null
    ]
  );
};
