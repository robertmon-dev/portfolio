import React from "react";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
> {
  label?: string;
  options: SelectOption[];
  value?: string | number;

  onChange?: (event: {
    target: { name?: string; value: string | number };
  }) => void;

  error?: string | boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
  placeholder?: string;
}
