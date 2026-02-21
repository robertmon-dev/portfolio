import { useTranslation } from 'react-i18next';
import type { NavbarProps } from './types';
import './NavBar.scss';


export const Navbar = ({
  brand,
  children,
  actions,
  className = '',
  ...rest
}: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <header
      className={`navbar ${className}`.trim()}
      aria-label={t('navbar.mainAria', 'Główna nawigacja')}
      {...rest}
    >
      <div className="navbar__container">

        {brand && (
          <div className="navbar__brand">
            {brand}
          </div>
        )}

        {children && (
          <nav
            className="navbar__nav"
            aria-label={t('navbar.menuAria', 'Menu główne')}
          >
            {children}
          </nav>
        )}

        {actions && (
          <div className="navbar__actions">
            {actions}
          </div>
        )}

      </div>
    </header>
  );
};
