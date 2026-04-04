import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGithubActions } from "./useGithubActions";
import { getGithubColumns } from "./components/getGithubColumns";
import { EntityTable } from "@/components/molecules/EntityTable/EntityTable";
import { Header } from "@/components/molecules/Sections/Header/Header";
import { LoadingBar } from "@/components/atoms/LoadingBar/LoadingBar";
import { Github, Link2 } from "lucide-react";
import { GithubModals } from "@/components/molecules/Modals/GithubRepository/Modal";
import "./Repos.scss";

export const GithubAdminPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useGithubActions();

  const linkedCount = useMemo(
    () => state.repos.filter((r) => !!r.project).length,
    [state.repos],
  );

  const headerTags = useMemo(
    () => [
      {
        id: "count",
        children: t("admin.github.stats.count", {
          count: state.repos.length,
          defaultValue: "{{count}} Repos",
        }),
        variant: "info" as const,
        icon: <Github size={12} />,
      },
      {
        id: "linked",
        children: t("admin.github.stats.linked", {
          count: linkedCount,
          defaultValue: "{{count}} Linked",
        }),
        variant: "success" as const,
        icon: <Link2 size={12} />,
      },
    ],
    [state.repos.length, linkedCount, t],
  );

  const columns = useMemo(
    () =>
      getGithubColumns(
        t,
        (repo) => {
          actions.openModal("UPDATE", repo.id);
        },
        (id) => {
          actions.openModal("DELETE", id);
        },
        (repo) => {
          actions.openModal("LINK", repo.id);
        },
        (repo) => {
          actions.selectRepo(repo.id);
          actions.unlinkFromProject(repo.id);
        },
        state.processingId,
      ),
    [t, actions, state.processingId],
  );

  return (
    <div className="github-management">
      <Header
        title={t("admin.github.title", "GitHub Repositories")}
        subtitle={t(
          "admin.github.subtitle",
          "Sync and manage your public projects",
        )}
        tags={headerTags}
      />

      <div className="github-management__loader-container">
        <LoadingBar isLoading={state.isLoading} variant="primary" fullWidth />
      </div>

      <main className="github-management__content">
        <EntityTable
          data={state.repos}
          columns={columns}
          isLoading={state.isLoading}
          onRowClick={(repo) => actions.selectRepo(repo.id)}
        />
      </main>

      <GithubModals state={state} actions={actions} />
    </div>
  );
};
