import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getInputWrapperClasses } from "../Input/styles";
import { bem } from "../../utility/bem";
import { useSelectDropdown } from "./useSelectDropdown";
import type { SelectProps } from "./types";
import "./Select.scss";

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      error,
      leftIcon,
      fullWidth = false,
      placeholder,
      disabled,
      name,
      onBlur,
      id,
      className,
    },
    ref,
  ) => {
    const { isOpen, toggle, close, containerRef, triggerRef, dropdownStyles } =
      useSelectDropdown();

    const selectedOption = options.find((opt) => opt.value === value);
    const errorMessage = typeof error === "string" ? error : null;

    const wrapperClasses = getInputWrapperClasses({
      error,
      fullWidth,
      disabled,
    });

    const setRefs = (element: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <div
        className={`input-container ${fullWidth ? "full-width" : ""} ${className || ""}`}
        ref={setRefs}
      >
        {label && (
          <label htmlFor={id} className="input-label">
            {label}
          </label>
        )}

        <div className="select-custom-container">
          <div
            id={id}
            ref={triggerRef}
            className={bem(wrapperClasses, [
              "select-wrapper-custom",
              isOpen && "open",
            ])}
            onClick={() => toggle(disabled)}
            onBlur={onBlur}
            tabIndex={disabled ? -1 : 0}
          >
            {leftIcon && (
              <span className="input-icon input-icon--left">{leftIcon}</span>
            )}

            <div className="select-custom-value">
              {selectedOption ? (
                selectedOption.label
              ) : (
                <span className="placeholder">{placeholder}</span>
              )}
            </div>

            <span className={`select-chevron ${isOpen ? "rotated" : ""}`}>
              <ChevronDown size={18} />
            </span>
          </div>

          {typeof document !== "undefined" &&
            createPortal(
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    className="select-dropdown-list"
                    style={{
                      position: "absolute",
                      top: `${dropdownStyles.top}px`,
                      left: `${dropdownStyles.left}px`,
                      width: `${dropdownStyles.width}px`,
                      zIndex: 20000,
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {options.map((option) => (
                      <li
                        key={option.value}
                        className={bem("select-dropdown-item", [
                          option.value === value && "active",
                        ])}
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange?.({
                            target: { name, value: option.value },
                          });
                          close();
                        }}
                      >
                        {option.label}
                        {option.value === value && (
                          <Check size={14} className="check-icon" />
                        )}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>,
              document.body,
            )}
        </div>

        {errorMessage && (
          <span className="input-error-msg">{errorMessage}</span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
