import { Position } from './types';

export const calculateMenuPosition = (
  anchorEl: HTMLElement | null,
  offset = { x: 0, y: 5 }
): Position => {
  if (!anchorEl) return { top: 0, left: 0 };

  const rect = anchorEl.getBoundingClientRect();
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;

  return {
    top: rect.bottom + scrollY + offset.y,
    left: rect.left + scrollX + offset.x,
    width: rect.width,
  };
};
