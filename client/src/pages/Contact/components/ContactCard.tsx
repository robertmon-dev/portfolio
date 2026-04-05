import { getPlatformIcon } from "@/lib/utils/render";
import type { ContactCardProps } from "../types";
import "./ContactCard.scss";

export const ContactCard = ({
  platform,
  url,
  displayValue,
}: ContactCardProps) => {
  const isMailto = url.startsWith("mailto:");

  return (
    <a
      href={url}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noreferrer"}
      className="contact-card"
    >
      <div className="contact-card__header">
        <span className="contact-card__icon">
          {getPlatformIcon(platform, url)}
        </span>
        <span className="contact-card__label">{platform}</span>
      </div>
      <span className="contact-card__value">{displayValue}</span>
    </a>
  );
};
