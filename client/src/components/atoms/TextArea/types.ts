import React from 'react';

export type TextAreaState = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean | string;
  state?: TextAreaState;
  disabled?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}
