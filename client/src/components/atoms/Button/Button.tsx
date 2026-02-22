import { forwardRef } from 'react';
import type { ButtonProps } from './types';
import { getButtonClasses } from './styles';
export type { ButtonVariant } from './types';
import './Button.scss'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    isIcon = false,
    variant = 'primary',
    fullWidth = false,
    className,
    ...rest
  } = props;

  const classes = getButtonClasses({
    isLoading,
    isIcon,
    variant,
    fullWidth,
    className
  });

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        <>
          {isIcon ? (
            children || leftIcon || rightIcon
          ) : (
            <>
              {leftIcon && <span className="btn-icon">{leftIcon}</span>}
              <span className="btn-label">{children}</span>
              {rightIcon && <span className="btn-icon">{rightIcon}</span>}
            </>
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
