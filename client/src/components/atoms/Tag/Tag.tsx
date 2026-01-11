import { forwardRef } from 'react';
import { X } from 'lucide-react';
import type { TagProps } from './types';
import { getTagClasses } from './styles';
import './Tag.scss';


export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    children,
    variant = 'default',
    size = 'md',
    icon,
    onDismiss,
    clickable = false,
    className = '',
    onClick,
    ...rest
  } = props;

  const isClickable = clickable || !!onClick;

  const tagClasses = getTagClasses({
    variant,
    size,
    clickable: isClickable
  });

  return (
    <div
      ref={ref}
      className={`${tagClasses} ${className}`}
      onClick={isClickable ? onClick : undefined}
      {...rest}
    >
      {icon && (
        <span className="tag-icon flex items-center justify-center">
          {icon}
        </span>
      )}

      <span>{children}</span>

      {onDismiss && (
        <span
          className="tag-dismiss"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          role="button"
          tabIndex={0}
          aria-label="Remove tag"
        >
          <X size="100%" strokeWidth={2.5} />
        </span>
      )}
    </div>
  );
});

Tag.displayName = 'Tag';
