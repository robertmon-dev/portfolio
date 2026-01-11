import { forwardRef } from 'react';
import type { ButtonProps } from './types';
import { getButtonClasses } from './styles';
import './Button.scss'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...rest
  } = props;
  const classes = getButtonClasses({ isLoading, ...rest });

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="btn-spinner" />}

      {!isLoading && leftIcon && (
        <span className="btn-icon mr-2">{leftIcon}</span>
      )}

      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="btn-icon ml-2">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
