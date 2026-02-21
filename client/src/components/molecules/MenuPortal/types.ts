import { ReactNode } from 'react';

export type UseMenuPortalProps = Pick<MenuPortalProps, 'isOpen' | 'onClose' | 'anchorEl' | 'offset'>;

export interface Position {
  top: number;
  left: number;
  width?: number;
}

export interface MenuPortalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: ReactNode;
  offset?: { x: number; y: number };
  minWidth?: number | 'anchor';
}
