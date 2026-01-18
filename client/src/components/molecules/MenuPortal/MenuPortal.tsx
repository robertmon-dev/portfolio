import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { calculateMenuPosition } from './utils';
import type { MenuPortalProps, Position } from './types';
import { getStyle } from './consts';
import './MenuPortal.scss';


export const MenuPortal = ({
  isOpen,
  onClose,
  anchorEl,
  children,
  offset,
  minWidth
}: MenuPortalProps) => {
  const [coords, setCoords] = useState<Position>({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && anchorEl) {
      setCoords(calculateMenuPosition(anchorEl, offset));
    }
  }, [isOpen, anchorEl, offset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorEl && !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorEl]);

  return createPortal(
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames="menu-portal-anim"
      unmountOnExit
      nodeRef={menuRef}
    >
      <div
        ref={menuRef}
        className="menu-portal"
        style={getStyle(coords, minWidth)}
      >
        {children}
      </div>
    </CSSTransition>,
    document.body
  );
};
