import type { ReactNode } from 'react';

export type ToolTipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ToolTipProps {
  children: ReactNode;
  content: string;
  position?: ToolTipPosition;
  delay?: boolean;
  className?: string;
}
