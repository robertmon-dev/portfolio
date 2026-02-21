import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ListOption } from '@/components/molecules/List/types';

export const useLayout = () => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pl', label: 'Polski' },
  ];

  const currentLangLabel = languages.find(l => l.code === i18n.language)?.label || 'English';

  const handleLangSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const navItems: ListOption[] = [
    { id: 'about', label: t('nav.about', 'About'), href: '/', isActive: true },
    { id: 'projects', label: t('nav.projects', 'Projects'), href: '/projects' },
    { id: 'experience', label: t('nav.experience', 'Experience'), href: '/experience' },
    { id: 'contact', label: t('nav.contact', 'Contact'), href: '/contact' },
  ];

  const sidebarItems: ListOption[] = [];

  const footerItems: ListOption[] = [
    { id: 'privacy', label: t('footer.privacy', 'Polityka prywatności'), href: '/privacy' },
    { id: 'terms', label: t('footer.terms', 'Regulamin'), href: '/terms' },
    { id: 'contact', label: t('footer.contact', 'Kontakt'), href: '/contact' },
  ];

  return {
    isLangOpen,
    setIsLangOpen,
    currentLangLabel,
    handleLangSelect,
    navItems,
    sidebarItems,
    footerItems,
    t
  };
};

