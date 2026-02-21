import { useTranslation } from "react-i18next";
import { useDemo } from "./useDemo";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { MenuPortal } from "@/components/molecules/MenuPortal/MenuPortal";
import Modal from "@/components/molecules/Modals/Modal";
import { Button } from "@/components/atoms/Button/Button";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { Switch } from "@/components/atoms/Switch/Switch";
import { Checkbox } from "@/components/atoms/CheckBox/CheckBox";
import { Edit2, Trash2 } from "lucide-react";
import { ButtonsSection } from "./Sections/ButtonsSection";
import { TagsSection } from "./Sections/TagsSection";
import { ListsSection } from "./Sections/ListsSection";
import { GridSection } from "./Sections/GridSection";
import { FormsSection } from "./Sections/FormsSection";
import { CodeSection } from "./Sections/CodeSection";
import { CardsSection } from "./Sections/CardsSection";
import { ModalsSection } from "./Sections/ModalsSection";
import { TimelineSection } from "./Sections/TimelineSection";
import "./Demo.scss";

export const Demo = () => {
  const { t } = useTranslation();
  const {
    isModalOpen,
    setIsModalOpen,
    loading,
    toggleGlobalLoading,
    checked,
    setChecked,
    isGridLoading,
    handleSimulateLoading,
    menuAnchorEl,
    handleOpenMenu,
    handleCloseMenu,
    sampleCode,
    demoListItems,
    demoGridData,
    demoHeaderTags,
    demoTimelineData
  } = useDemo();

  return (
    <div className="demo-page">
      <Header
        title={t("demo.header.title", "Demo courvogne palette")}
        subtitle={t("demo.header.subtitle", "Tokyo night by Courvogne")}
        tags={demoHeaderTags}
      />

      <LoadingBar isLoading={loading} variant="primary" padding="sm" />

      <div className="demo-page__content">
        <ButtonsSection
          loading={loading}
          toggleGlobalLoading={toggleGlobalLoading}
        />
        <TagsSection />
        <ListsSection demoListItems={demoListItems} />
        <GridSection
          demoGridData={demoGridData}
          isGridLoading={isGridLoading}
          handleSimulateLoading={handleSimulateLoading}
          handleOpenMenu={handleOpenMenu}
        />
        <FormsSection checked={checked} setChecked={setChecked} />
        <CodeSection sampleCode={sampleCode} />
        <CardsSection />
        <ModalsSection setIsModalOpen={setIsModalOpen} />
        <TimelineSection timelineData={demoTimelineData} />
      </div>

      <MenuPortal
        isOpen={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        anchorEl={menuAnchorEl}
      >
        <button className="demo-context-menu__item" onClick={handleCloseMenu}>
          <Edit2 size={14} /> {t("common.edit", "Edytuj")}
        </button>
        <button
          className="demo-context-menu__item demo-context-menu__item--danger"
          onClick={handleCloseMenu}
        >
          <Trash2 size={14} /> {t("common.delete", "Usuń")}
        </button>
      </MenuPortal>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("demo.modals.configTitle", "Konfiguracja agencji")}
      >
        <div className="demo-modal-form">
          <TextArea label={t("demo.modals.form.descLabel", "Opis")} fullWidth />
          <div className="demo-modal-form__settings">
            <Switch label={t("demo.modals.form.publicLabel", "Publiczna")} />
            <Checkbox
              label={t("demo.modals.form.require2faLabel", "Wymagaj 2FA")}
            />
          </div>
          <div className="demo-modal-form__footer">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              {t("common.cancel", "Anuluj")}
            </Button>
            <Button variant="primary">{t("common.save", "Zapisz")}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
