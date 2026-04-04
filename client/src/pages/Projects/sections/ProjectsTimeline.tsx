import { Card } from "@/components/atoms/Card/Card";
import { TimelineGrid } from "@/components/molecules/Timeline/Timeline";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github, Star } from "lucide-react";
import { format } from "date-fns";
import type { ProjectsTimelineProps } from "../types";
import type { Project } from "@portfolio/shared";
import "./ProjectsTimeline.scss";

export const ProjectsTimeline = ({ items }: ProjectsTimelineProps) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  const timelineItems = items.map((item: Project) => ({
    id: item.id,
    content: (
      <Card
        variant="levitating"
        interactive
        padding="none"
        className={`project-card ${item.isFeatured ? "project-card--featured" : ""}`}
      >
        {item.imageUrl && (
          <div className="project-card__image-wrapper">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="project-card__image"
              loading="lazy"
            />
          </div>
        )}

        <div className="project-card__content">
          <div className="project-card__header">
            <div className="project-card__title-group">
              <h3 className="project-card__title">
                {item.title}
                {item.isFeatured && (
                  <Star size={18} className="project-card__featured-icon" />
                )}
              </h3>

              <span className="project-card__date">
                {format(new Date(item.createdAt), "MMM yyyy")}
              </span>
            </div>

            <div className="project-card__links">
              {item.githubRepoId && (
                <button
                  className="project-card__icon-btn"
                  title={t(
                    "projects.repo",
                    "Repository ID: " + item.githubRepoId,
                  )}
                >
                  <Github size={20} />
                </button>
              )}
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__icon-btn"
                  title={t("projects.demo", "Live Demo")}
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="project-card__description">{item.description}</p>
        </div>
      </Card>
    ),
    gapToNext: "30vh",
  }));

  return (
    <div className="projects-timeline">
      <TimelineGrid items={timelineItems} />
    </div>
  );
};
