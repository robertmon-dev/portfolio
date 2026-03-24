import React from "react";

export interface SelectOption {
  readonly value: string | number;
  readonly label: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange" | "onBlur"
> {
  label?: string;
  options: readonly SelectOption[];
  value?: string | number;

  onChange?: (event: {
    target: { name?: string; value: string | number };
  }) => void;

  error?: string | boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}
