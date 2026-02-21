import { ReactNode } from 'react';
import type { HTMLAttributes } from 'react';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}

