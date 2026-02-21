import type { NavbarSectionProps } from "@/components/organisms/NavBar/types";

export const NavbarLogo = ({ children, className = '', ...rest }: NavbarSectionProps) => {
  return (
    <div className={`navbar__brand ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};
