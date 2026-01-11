import { forwardRef, useId } from 'react';
import type { SwitchProps, CustomCSS } from './types';
import { getSwitchClasses } from './styles';
import './Switch.scss';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    size = 'md',
    label,
    iconOff,
    iconOn,
    colorOn,
    colorOff,
    className,
    disabled,
    style,
    ...rest
  } = props;

  const uniqueId = useId();
  const id = props.id || uniqueId;
  const classes = getSwitchClasses({ size, disabled, className });
  const dynamicStyles: CustomCSS = {
    ...style,
    '--switch-color-on': colorOn,
    '--switch-color-off': colorOff,
  };

  return (
    <label htmlFor={id} className={classes} style={dynamicStyles}>
      <input
        ref={ref}
        type="checkbox"
        id={id}
        disabled={disabled}
        role="switch"
        {...rest}
      />

      <span className="switch-slider" aria-hidden="true">
        {iconOff && (
          <span className="switch-icon switch-icon--off">
            {iconOff}
          </span>
        )}

        {iconOn && (
          <span className="switch-icon switch-icon--on">
            {iconOn}
          </span>
        )}
      </span>
      {label && <span className="switch-label">{label}</span>}
    </label>
  );
});

Switch.displayName = 'Switch';
