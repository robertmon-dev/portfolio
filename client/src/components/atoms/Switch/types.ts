import React, { type CSSProperties } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';
export interface CustomCSS extends CSSProperties {
  '--switch-color-on'?: string;
  '--switch-color-off'?: string;
}

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SwitchSize;
  label?: string;
  iconOff?: React.ReactNode;
  iconOn?: React.ReactNode;
  colorOff?: string;
  colorOn?: string;
}


