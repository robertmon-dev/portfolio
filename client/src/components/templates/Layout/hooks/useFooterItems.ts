import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import React from "react";
import type { ListOption } from "@/components/molecules/List/List";

export const useFooterItems = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks: ListOption[] = [
    {
      id: "github",
      label: "GitHub",
      icon: React.createElement(Github, { size: 16 }),
      onClick: () => window.open("https://github.com/robertmon-dev", "_blank"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: React.createElement(Linkedin, { size: 16 }),
      onClick: () =>
        window.open("https://linkedin.com/in/robert-moń-7470061a0", "_blank"),
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: React.createElement(Instagram, { size: 16 }),
      onClick: () => window.open("https://instagram.com/monievvv", "_blank"),
    },
    {
      id: "contact-social",
      label: t("footer.links.contact", "Contact"),
      icon: React.createElement(Mail, { size: 16 }),
      onClick: () => (window.location.href = "mailto:m0ni3v@gmail.com"),
    },
  ];

  const navLinks: ListOption[] = [
    {
      id: "privacy",
      label: t("footer.nav.privacy", "Privacy Policy"),
      href: "/privacy",
    },
    {
      id: "contact-nav",
      label: t("footer.nav.contact", "Contact"),
      href: "/contact",
    },
  ];

  return {
    currentYear,
    socialLinks,
    navLinks,
    t,
  };
};
