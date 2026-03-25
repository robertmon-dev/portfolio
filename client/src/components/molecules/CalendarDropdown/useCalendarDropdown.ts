import { useState, useEffect, useRef } from "react";

export const useCalendarDropdown = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const selected = menuRef.current?.querySelector(
      '[aria-selected="true"]',
    ) as HTMLElement | null;

    selected?.scrollIntoView({ block: "nearest" });
  }, [open]);

  return {
    open,
    setOpen,
    containerRef,
    menuRef,
  };
};
