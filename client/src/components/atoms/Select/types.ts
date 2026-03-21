import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string | boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
  placeholder?: string;
}
