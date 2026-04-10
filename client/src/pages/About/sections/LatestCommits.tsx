import { useTranslation } from "react-i18next";
import { CommitListItem } from "../components/CommitListItem";
import type { LatestCommitsProps } from "../types";
import "./LatestCommits.scss";

export const LatestCommits = ({ items }: LatestCommitsProps) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) {
    return (
      <p className="latest-commits__empty">
        {t("about.sections.noCommits", "No recent commits found.")}
      </p>
    );
  }

  return (
    <div className="latest-commits">
      {items.map((commit, index) => (
        <CommitListItem key={commit.id} commit={commit} index={index} />
      ))}
    </div>
  );
};
