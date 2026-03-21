import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getInputWrapperClasses } from '../Input/styles';
import { bem } from '../../utility/bem';
import type { SelectProps } from './types';
import './Select.scss';

export const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  leftIcon,
  fullWidth = false,
  placeholder,
  disabled,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [dropdownStyles, setDropdownStyles] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  const selectedOption = options.find(opt => opt.value === value);

  const wrapperClasses = getInputWrapperClasses({ error, fullWidth, disabled });
  const errorMessage = typeof error === 'string' ? error : null;

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownStyles({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isDropdownClick = target.closest('.select-dropdown-list');

      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !isDropdownClick
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, true);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, [isOpen]);

  return (
    <div className={`input-container ${fullWidth ? 'full-width' : ''}`} ref={containerRef}>
      {label && <label className="input-label">{label}</label>}

      <div className="select-custom-container">
        <div
          ref={triggerRef}
          className={bem(wrapperClasses, ['select-wrapper-custom', isOpen && 'open'])}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {leftIcon && <span className="input-icon input-icon--left">{leftIcon}</span>}

          <div className="select-custom-value">
            {selectedOption ? selectedOption.label : <span className="placeholder">{placeholder}</span>}
          </div>

          <span className={`select-chevron ${isOpen ? 'rotated' : ''}`}>
            <ChevronDown size={18} />
          </span>
        </div>

        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                className="select-dropdown-list"
                style={{
                  position: 'absolute',
                  top: `${dropdownStyles.top}px`,
                  left: `${dropdownStyles.left}px`,
                  width: `${dropdownStyles.width}px`,
                  zIndex: 20000
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {options.map((option) => (
                  <li
                    key={option.value}
                    className={bem('select-dropdown-item', [option.value === value && 'active'])}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange?.({ target: { value: option.value } });
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                    {option.value === value && <Check size={14} className="check-icon" />}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>

      {errorMessage && <span className="input-error-msg">{errorMessage}</span>}
    </div>
  );
};
