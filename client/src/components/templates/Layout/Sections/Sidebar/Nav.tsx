import type { SidebarSectionProps } from '@/components/organisms/SideBar/types';

export const SidebarNav = ({ children, className = '', ...rest }: SidebarSectionProps) => (
  <nav className={`sidebar__nav ${className}`.trim()} {...rest}>
    {children}
  </nav>
);
