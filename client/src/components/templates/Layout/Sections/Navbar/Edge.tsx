import type { NavbarSectionProps } from "@/components/organisms/NavBar/types";

export const NavbarEdge = ({ children, className = '', ...rest }: NavbarSectionProps) => {
  return (
    <div className={`navbar__actions ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};
