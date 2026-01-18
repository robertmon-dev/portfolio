import { getSpinnerConfig } from './utils';
import type { SpinnerProps } from './types';
import './Spinner.scss';

export const Spinner = ({
  variant = 'default',
  size,
  color,
  className = ''
}: SpinnerProps) => {

  const { Component, props, wrapperClasses } = getSpinnerConfig(
    variant,
    size,
    color,
    className
  );

  return (
    <div className={wrapperClasses}>
      <Component {...props} />
    </div>
  );
};
