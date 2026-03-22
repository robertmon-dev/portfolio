import { useTranslation } from "react-i18next";
import { Building } from "lucide-react";
import { List } from "@/components/molecules/List/List";
import type { FooterRightSectionProps } from "./types";

export const FooterRightSection = ({
  navLinks,
  currentYear,
  brandName,
}: FooterRightSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="app-footer__right-section">
      <nav className="app-footer__nav-group">
        <List
          items={navLinks}
          variant="nav"
          direction="row"
          className="app-footer__generic-nav"
        />
      </nav>
      <div className="app-footer__meta">
        <div className="app-footer__brand-mini">
          <Building size={14} color="var(--tn-blue)" />
          <span>{brandName}</span>
        </div>
        <div className="app-footer__copyright">
          © {currentYear} {t("footer.rights", "All rights reserved.")}
        </div>
      </div>
    </div>
  );
};
