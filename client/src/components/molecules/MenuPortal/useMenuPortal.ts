import { useState, useEffect, useRef } from 'react';
import { calculateMenuPosition } from './utils';
import type { UseMenuPortalProps, Position } from './types';

export const useMenuPortal = ({ isOpen, onClose, anchorEl, offset }: UseMenuPortalProps) => {
  const [coords, setCoords] = useState<Position>({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && anchorEl) {
      setCoords(calculateMenuPosition(anchorEl, offset));
    }
  }, [isOpen, anchorEl, offset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);
      const isOutsideAnchor = anchorEl && !anchorEl.contains(target);

      if (isOpen && isOutsideMenu && isOutsideAnchor) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorEl]);

  return {
    coords,
    menuRef,
  };
};
