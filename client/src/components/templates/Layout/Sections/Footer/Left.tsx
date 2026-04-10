import { useTranslation } from "react-i18next";
import { Select } from "@/components/molecules/Select/Select";
import { List } from "@/components/molecules/List/List";
import type { FooterLeftSectionProps } from "./types";

export const FooterLeftSection = ({
  isLangOpen,
  setIsLangOpen,
  currentLangLabel,
  handleLangSelect,
  socialLinks,
  languages,
}: FooterLeftSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="app-footer__content-wrapper">
      <div className="app-footer__group">
        <span className="app-footer__label">
          {t("footer.labels.language", "Language")}
        </span>
        <Select
          variant="footer"
          isOpen={isLangOpen}
          onOpenChange={setIsLangOpen}
          trigger={<span>{currentLangLabel}</span>}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="demo-context-menu__item"
              onClick={() => handleLangSelect(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </Select>
      </div>

      <div className="app-footer__group">
        <span className="app-footer__label">
          {t("footer.social", "Social")}
        </span>
        <List
          items={socialLinks}
          variant="nav"
          direction="row"
          className="app-footer__social-list"
        />
      </div>
    </div>
  );
};
