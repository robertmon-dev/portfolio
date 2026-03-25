import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, Plus } from "lucide-react";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { Button } from "@/components/atoms/Button/Button";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { ExperienceModals } from "@/components/molecules/Modals/Experience/Modal";
import { useExperienceActions } from "./useExperienceActions";
import { getExperienceColumns } from "./components/getExperienceColums";
import "./Experience.scss";

export const ExperienceAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useExperienceActions();

  const headerTags = useMemo(
    () => [
      {
        id: "total",
        children: t("admin.experience.tags.total", {
          count: state.experiences.length,
        }),
        variant: "info" as const,
        icon: <Briefcase size={12} />,
      },
    ],
    [state.experiences.length, t],
  );

  const columns = useMemo(
    () =>
      getExperienceColumns(
        t,
        (exp) => actions.openModal("UPDATE", exp.id),
        (id) => actions.openModal("DELETE", id),
        state.processingId,
      ),
    [t, actions, state.processingId],
  );

  return (
    <div className="experience-management">
      <Header
        title={t("admin.experience.title")}
        subtitle={t("admin.experience.subtitle")}
        tags={headerTags}
        action={
          <Button
            onClick={() => actions.openModal("CREATE")}
            variant="primary"
            size="sm"
            leftIcon={<Plus size={16} />}
          >
            {t("admin.experience.actions.add")}
          </Button>
        }
      />

      <div className="experience-management__loader-container">
        <LoadingBar isLoading={state.isLoading} variant="primary" fullWidth />
      </div>

      <main className="experience-management__content">
        <EntityTable
          data={state.experiences}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(exp) => actions.selectExperience(exp.id)}
        />
      </main>

      <ExperienceModals state={state} actions={actions} />
    </div>
  );
};
