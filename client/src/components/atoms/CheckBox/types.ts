import type { InputHTMLAttributes, CSSProperties } from "react";

export interface CustomCSS extends CSSProperties {
  "--checkbox-color"?: string;
}

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: boolean;
  colorChecked?: string;
}
