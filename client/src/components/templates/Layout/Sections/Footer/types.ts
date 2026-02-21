import type { ListOption } from '@/components/molecules/List/List';

export interface LanguageOption {
  code: string;
  label: string;
}

export interface FooterLeftSectionProps {
  isLangOpen: boolean;
  setIsLangOpen: (val: boolean) => void;
  currentLangLabel: string;
  handleLangSelect: (code: string) => void;
  socialLinks: ListOption[];
  languages: LanguageOption[];
}

export interface FooterRightSectionProps {
  navLinks: ListOption[];
  currentYear: number;
  brandName: string;
}
