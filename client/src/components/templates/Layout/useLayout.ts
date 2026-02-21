import { useTranslation } from 'react-i18next';
import type { ListOption } from '@/components/molecules/List/types'; // Dopasuj ścieżkę do swoich typów

export const useLayout = () => {
  const { t } = useTranslation();

  const navItems: ListOption[] = [
    { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), href: '/', isActive: true },
    { id: 'agencies', label: t('nav.agencies', 'Agencje'), href: '/agencies' },
    { id: 'clients', label: t('nav.clients', 'Klienci'), href: '/clients' },
  ];

  const sidebarItems: ListOption[] = [
    { id: 'settings', label: t('sidebar.settings', 'Ustawienia systemu'), href: '/settings' },
    { id: 'users', label: t('sidebar.users', 'Użytkownicy'), href: '/users' },
    { id: 'billing', label: t('sidebar.billing', 'Płatności'), href: '/billing' },
  ];

  const footerItems: ListOption[] = [
    { id: 'privacy', label: t('footer.privacy', 'Polityka prywatności'), href: '/privacy' },
    { id: 'terms', label: t('footer.terms', 'Regulamin'), href: '/terms' },
    { id: 'contact', label: t('footer.contact', 'Kontakt'), href: '/contact' },
  ];

  return {
    navItems,
    sidebarItems,
    footerItems,
    t
  };
};
