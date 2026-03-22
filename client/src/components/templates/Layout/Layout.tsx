import { Navbar } from "@/components/organisms/NavBar/NavBar";
import { NavbarMain } from "./Sections/Navbar/Main";
import { NavbarEdge } from "./Sections/Navbar/Edge";
import { Footer } from "@/components/organisms/Footer/Footer";
import { FooterLeftSection } from "./Sections/Footer/Left";
import { FooterRightSection } from "./Sections/Footer/Right";
import { List } from "@/components/molecules/List/List";
import { Button } from "@/components/atoms/Button/Button";
import { Settings, LogOut, Loader2 } from "lucide-react";
import { LoginModal } from "@/components/molecules/Modals/Login/Modal";
import { useLoginModal } from "@/components/molecules/Modals/Login/useLoginModal";
import { useLayout } from "./hooks/useLayout";
import { useFooterItems } from "./hooks/useFooterItems";
import { useAuth } from "@/hooks/useAuth";
import type { LayoutProps } from "./types";
import { BRAND_NAME, LANGUAGES } from "./consts";
import "./Layout.scss";

export const Layout = ({ children }: LayoutProps) => {
  const {
    navItems,
    t,
    isLangOpen,
    setIsLangOpen,
    currentLangLabel,
    handleLangSelect,
    showAdminNav,
    adminNavItems,
  } = useLayout();

  const { socialLinks, navLinks, currentYear } = useFooterItems();

  const loginModal = useLoginModal();
  const { isLoggedIn, isUserLoading, logout, isLoggingOut } = useAuth();

  return (
    <div className="app-layout">
      <Navbar>
        <NavbarMain>
          <List items={navItems} variant="nav" direction="row" />
        </NavbarMain>

        <NavbarEdge>
          {isUserLoading ? (
            <div className="app-layout__auth-loader">
              <Loader2
                size={16}
                className="app-layout__spinner app-layout__spinner--muted"
              />
            </div>
          ) : isLoggedIn ? (
            <Button
              variant="ghost"
              isIcon
              aria-label={t("common.logout", "Logout")}
              onClick={logout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 size={20} className="app-layout__spinner" />
              ) : (
                <LogOut size={20} />
              )}
            </Button>
          ) : (
            <Button
              variant="ghost"
              isIcon
              aria-label={t("common.login", "Login to Admin Panel")}
              onClick={loginModal.open}
            >
              <Settings size={20} />
            </Button>
          )}
        </NavbarEdge>
      </Navbar>

      {showAdminNav && (
        <div className="app-layout__admin-bar">
          <div className="app-layout__admin-container">
            <span className="app-layout__admin-label">
              {t("common.management", "Management")}:
            </span>
            <List items={adminNavItems} variant="nav" direction="row" />
          </div>
        </div>
      )}

      <main className="app-layout__main">
        <div className="app-layout__content-container">{children}</div>
      </main>

      <Footer>
        <div className="app-footer__container">
          <FooterLeftSection
            isLangOpen={isLangOpen}
            setIsLangOpen={setIsLangOpen}
            currentLangLabel={currentLangLabel}
            handleLangSelect={handleLangSelect}
            socialLinks={socialLinks}
            languages={LANGUAGES}
          />

          <FooterRightSection
            navLinks={navLinks}
            currentYear={currentYear}
            brandName={BRAND_NAME}
          />
        </div>
      </Footer>

      <LoginModal
        open={loginModal.isOpen}
        onClose={loginModal.close}
        form={loginModal.form}
        isLoading={loginModal.isLoggingIn}
        step={loginModal.step}
      />
    </div>
  );
};
