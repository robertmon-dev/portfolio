import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { MenuPortal } from "@/components/molecules/MenuPortal/MenuPortal";
import type { SelectProps } from "./types";
import "./Select.scss";

export const Select = ({
  label,
  error,
  isOpen,
  onOpenChange,
  trigger,
  children,
  className = "",
  disabled = false,
  variant = "default",
}: SelectProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`select-molecule ${className}`}>
      {label && <span className="select-molecule__label">{label}</span>}

      <div className="select-molecule__wrapper" ref={triggerRef}>
        <div
          className={`
            select-molecule__trigger
            ${variant === "header" ? "select-molecule__trigger--header-style" : ""}
            ${isOpen ? "select-molecule__trigger--active" : ""}
            ${error ? "select-molecule__trigger--error" : ""}
            ${disabled ? "select-molecule__trigger--disabled" : ""}
          `}
          onClick={() => !disabled && onOpenChange(!isOpen)}
        >
          <div className="select-molecule__trigger-content">{trigger}</div>

          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`}
          />
        </div>

        <MenuPortal
          isOpen={isOpen}
          onClose={() => onOpenChange(false)}
          anchorEl={triggerRef.current}
          minWidth={triggerRef.current?.offsetWidth}
          variant={variant}
        >
          {children}
        </MenuPortal>
      </div>
    </div>
  );
};
