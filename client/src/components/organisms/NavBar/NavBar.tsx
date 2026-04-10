import { useTranslation } from "react-i18next";
import type { NavbarProps } from "./types";
import "./NavBar.scss";

export const Navbar = ({ children, className = "", ...rest }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <header
      className={`navbar ${className}`.trim()}
      aria-label={t("navbar.mainAria", "Main navigation")}
      {...rest}
    >
      <div className="navbar__container">{children}</div>
    </header>
  );
};
