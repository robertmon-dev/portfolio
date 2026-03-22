import type { SidebarSectionProps } from "@/components/organisms/SideBar/types";

export const SidebarFooter = ({
  children,
  className = "",
  ...rest
}: SidebarSectionProps) => (
  <div className={`sidebar__footer ${className}`.trim()} {...rest}>
    {children}
  </div>
);
