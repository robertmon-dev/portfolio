import React, { type ReactNode } from 'react';

export type TextDisplayState = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface TextDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: ReactNode;
  state?: TextDisplayState;
  copyable?: boolean;
  maxHeight?: string;
  fullWidth?: boolean;
  helperText?: string;
}
