import "./CalendarDropdown.scss";
import { useCalendarDropdown } from "./useCalendarDropdown.ts";
import type { CalendarDropdownProps } from "./types.ts";

const CalendarDropdown = ({
  value,
  options,
  onSelect,
  ariaLabel,
}: CalendarDropdownProps) => {
  const { open, setOpen, containerRef, menuRef } = useCalendarDropdown();

  const label = options.find((opt) => opt.value === value)?.label ?? value;

  return (
    <div
      className={`documents-calendar__select${open ? " open" : ""}`}
      ref={containerRef}
    >
      <button
        type="button"
        className="documents-calendar__select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
      </button>
      <ul
        className="documents-calendar__select-menu"
        role="listbox"
        aria-label={ariaLabel}
        ref={menuRef}
      >
        {options.map((opt) => (
          <li key={opt.value}>
            <button
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarDropdown;
