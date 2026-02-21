import type { NavbarSectionProps } from "@/components/organisms/NavBar/types";
import { useTranslation } from "react-i18next";

export const NavbarMain = ({ children, className = '', ...rest }: NavbarSectionProps) => {
  const { t } = useTranslation();

  return (
    <nav
      className={`navbar__nav ${className}`.trim()}
      aria-label={t('navbar.menuAria', 'Menu główne')}
      {...rest}
    >
      {children}
    </nav>
  );
};
