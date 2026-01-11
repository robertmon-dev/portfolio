import { bem } from '../../utility/bem';
import type { TagVariant, TagSize } from './types';

interface StyleProps {
  variant: TagVariant;
  size: TagSize;
  clickable?: boolean;
}

export const getTagClasses = ({
  variant,
  size,
  clickable
}: StyleProps): string => {
  return bem(
    'tag',
    [
      variant,
      size,
      clickable ? 'clickable' : null
    ]
  );
};
