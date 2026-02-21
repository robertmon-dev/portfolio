import type { FooterProps } from './types';
import './Footer.scss';


export const Footer = ({
  brand,
  copyright,
  children,
  className = '',
  ...rest
}: FooterProps) => {
  return (
    <footer className={`app-footer ${className}`.trim()} {...rest}>
      <div className="app-footer__container">
        {brand && (
          <div className="app-footer__brand">
            {brand}
          </div>
        )}

        {children && (
          <nav className="app-footer__nav">
            {children}
          </nav>
        )}

        {copyright && (
          <div className="app-footer__copyright">
            {copyright}
          </div>
        )}

      </div>
    </footer>
  );
};
