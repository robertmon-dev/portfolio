export interface CalendarDropdownOption {
  value: number;
  label: string;
}

export interface CalendarDropdownProps {
  value: number;
  options: CalendarDropdownOption[];
  onSelect: (value: number) => void;
  ariaLabel: string;
  disabled?: boolean;
}
