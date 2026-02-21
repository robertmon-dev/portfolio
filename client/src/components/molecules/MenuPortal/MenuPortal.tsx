import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuPortal } from './useMenuPortal';
import type { MenuPortalProps } from './types';
import { getStyle } from './consts';
import './MenuPortal.scss';

export const MenuPortal = (props: MenuPortalProps) => {
  const {
    isOpen,
    onClose,
    anchorEl,
    children,
    offset,
    minWidth,
    variant = 'default'
  } = props;

  const { coords, menuRef } = useMenuPortal({ isOpen, onClose, anchorEl, offset });

  if (typeof document === 'undefined') return null;

  const portalStyle = {
    ...getStyle(coords, minWidth),
    width: typeof minWidth === 'number' ? `${minWidth}px` : undefined,
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className={`menu-portal menu-portal--${variant}`}
          style={portalStyle}
          initial={{ opacity: 0, y: variant === 'footer' ? 10 : -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: variant === 'footer' ? 10 : -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
