import { Navbar } from '@/components/organisms/NavBar/NavBar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { List } from '@/components/molecules/List/List';
import { Button } from '@/components/atoms/Button/Button';
import { Settings, Building } from 'lucide-react';
import { useLayout } from './useLayout';
import type { LayoutProps } from './types';
import './Layout.scss';

export const Layout = ({ children }: LayoutProps) => {
  const { navItems, sidebarItems, footerItems, t } = useLayout();
  const currentYear = new Date().getFullYear();

  return (
    <div className="app-layout">
      <Navbar
        brand={
          <div className="app-layout__brand">
            <Building size={24} /> <span>AdminPanel</span>
          </div>
        }
        actions={
          <Button variant="ghost" isIcon aria-label={t('common.settings', 'Ustawienia')}>
            <Settings size={20} />
          </Button>
        }
      >
        <List items={navItems} variant="nav" direction="row" />
      </Navbar>

      <div className="app-layout__wrapper">
        <main className="app-layout__main">
          {children}
        </main>
      </div>

      <Footer
        brand={
          <>
            <Building size={16} />
            <span style={{ marginLeft: '4px' }}>AdminPanel</span>
          </>
        }
        copyright={`© ${currentYear} MojaFirma. ${t('footer.rights', 'Wszelkie prawa zastrzeżone.')}`}
      >
        <List items={footerItems} variant="footer" direction="row" />
      </Footer>
    </div>
  );
};
