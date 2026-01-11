import React from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'transparent' | 'levitating' | 'levitating-transparent';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
}
