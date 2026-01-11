import { bem } from '../../utility/bem';
import type { ToolTipPosition } from './types';

interface StyleProps {
  position: ToolTipPosition;
}

export const getToolTipClasses = ({ position }: StyleProps): string => {
  return bem('tooltip-body', [position]);
};
