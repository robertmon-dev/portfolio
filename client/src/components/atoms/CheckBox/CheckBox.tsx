import { forwardRef, useId } from "react";
import { Check } from "lucide-react";
import type { CheckboxProps, CustomCSS } from "./types";
import "./CheckBox.scss";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      label,
      error,
      colorChecked,
      className = "",
      disabled,
      id,
      style,
      ...rest
    } = props;

    const generatedId = useId();
    const inputId = id || generatedId;

    const dynamicStyles: CustomCSS = {
      ...style,
      "--checkbox-color": colorChecked,
    };

    return (
      <label
        htmlFor={inputId}
        className={`checkbox-container ${error ? "checkbox-container--error" : ""} ${disabled ? "checkbox-container--disabled" : ""} ${className}`}
        style={dynamicStyles}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          disabled={disabled}
          {...rest}
        />

        <div className="checkbox-box">
          <Check size={14} strokeWidth={3} className="checkbox-icon" />
        </div>

        {label && <span className="checkbox-label">{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
