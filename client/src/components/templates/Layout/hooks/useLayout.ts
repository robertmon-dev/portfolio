import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useAccess } from "@/hooks/useAccess";
import type { ListOption } from "@/components/molecules/List/types";

export const useLayout = () => {
  const { t, i18n } = useTranslation();
  const { can, isAdmin, isAuthenticated } = useAccess();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  const languages = [
    { code: "en", label: "English" },
    { code: "pl", label: "Polski" },
  ];

  const currentLangLabel =
    languages.find((l) => l.code === i18n.language)?.label || "English";

  const handleLangSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const baseNavItems: ListOption[] = [
    { id: "about", label: t("nav.about", "About"), href: "/" },
    { id: "projects", label: t("nav.projects", "Projects"), href: "/projects" },
    {
      id: "experience",
      label: t("nav.experience", "Experience"),
      href: "/experience",
    },
    { id: "contact", label: t("nav.contact", "Contact"), href: "/contact" },
    { id: "blog", label: t("nav.blog", "Blog"), href: "/blog" },
  ];

  const adminNavItems: ListOption[] = [
    {
      id: "admin-github",
      label: t("nav.admin.repos", "Repos"),
      href: "/admin/github",
      res: "github",
    },
    {
      id: "admin-projects",
      label: t("nav.admin.projects", "Projects"),
      href: "/admin/projects",
      res: "projects",
    },
    {
      id: "admin-experience",
      label: t("nav.admin.experience", "Experience"),
      href: "/admin/experience",
      res: "experience",
    },
    {
      id: "admin-techstack",
      label: t("nav.admin.techstack", "Tech Stack"),
      href: "/admin/techstack",
      res: "techstack",
    },
    {
      id: "admin-users",
      label: t("nav.admin.users", "Users"),
      href: "/admin/users",
      res: "users",
    },
  ]
    .filter((item) => item.res && can(`${item.res}:*`))
    .map((item) => ({
      ...item,
      isActive: location.pathname.startsWith(item.href),
    }));
  const navItems: ListOption[] = baseNavItems.map((item) => ({
    ...item,
    isActive:
      location.pathname === item.href ||
      (!!item.href &&
        item.href !== "/" &&
        location.pathname.startsWith(item.href)),
  }));

  const showAdminNav = isAuthenticated && (isAdmin || adminNavItems.length > 0);
  const sidebarItems: ListOption[] = [];
  const footerItems: ListOption[] = [
    {
      id: "privacy",
      label: t("footer.privacy"),
      href: "/privacy",
    },
    { id: "terms", label: t("footer.terms"), href: "/terms" },
    { id: "contact", label: t("footer.contact"), href: "/contact" },
  ];

  return {
    isLangOpen,
    setIsLangOpen,
    currentLangLabel,
    handleLangSelect,
    navItems,
    sidebarItems,
    footerItems,
    adminNavItems,
    showAdminNav,
    t,
  };
};
