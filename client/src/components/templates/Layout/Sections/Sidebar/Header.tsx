import type { SidebarSectionProps } from '@/components/organisms/SideBar/types';

export const SidebarHeader = ({ children, className = '', ...rest }: SidebarSectionProps) => (
  <div className={`sidebar__header ${className}`.trim()} {...rest}>
    {children}
  </div>
);
