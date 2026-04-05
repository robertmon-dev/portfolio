import { Card } from "@/components/atoms/Card/Card";
import { getPlatformIcon } from "@/lib/utils/render";
import type { ContactCardProps } from "../types";
import "./ContactCard.scss";

export const ContactCard = ({
  platform,
  url,
  displayValue,
}: ContactCardProps) => {
  const isMailto = url.startsWith("mailto:");
  const Icon = getPlatformIcon(platform, url);

  return (
    <Card variant="contact" interactive padding="md" className="contact-card">
      <a
        href={url}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noreferrer"}
        className="contact-card__link"
      >
        <div className="contact-card__header">
          <span className="contact-card__icon">
            <Icon size={18} />
          </span>
          <span className="contact-card__label">{platform}</span>
        </div>
        <span className="contact-card__value">{displayValue}</span>
      </a>
    </Card>
  );
};
