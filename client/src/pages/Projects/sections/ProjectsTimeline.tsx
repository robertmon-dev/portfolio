import { Card } from "@/components/atoms/Card/Card";
import { TimelineGrid } from "@/components/molecules/Timeline/Timeline";
import { useTranslation } from "react-i18next";
import { isVideo } from "@/lib/utils/types";
import { ExternalLink, Github, Star } from "lucide-react";
import { format } from "date-fns";
import type { ProjectsTimelineProps } from "../types";
import type { ProjectWithRelations } from "@portfolio/shared";
import "./ProjectsTimeline.scss";

export const ProjectsTimeline = ({ items }: ProjectsTimelineProps) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  const timelineItems = items.map((item: ProjectWithRelations) => ({
    id: item.id,
    oppositeContent: (
      <div className="project-card__opposite">
        <span className="project-card__opposite-description">
          {item.description}
        </span>
      </div>
    ),
    content: (
      <Card
        variant="levitating"
        interactive
        padding="none"
        width="wide"
        className={`project-card ${item.isFeatured ? "project-card--featured" : ""}`}
      >
        {item.imageUrl && (
          <div className="project-card__image-wrapper">
            {isVideo(item.imageUrl) ? (
              <video
                src={item.imageUrl}
                className="project-card__image"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="project-card__image"
                loading="lazy"
              />
            )}
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
              {item.githubRepo ? (
                <a
                  href={item.githubRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__icon-btn project-card__icon-btn--github"
                  title={t("projects.repo", "Repository")}
                >
                  <Github size={20} />
                  {item.githubRepo.stars > 0 && (
                    <span className="project-card__stats">
                      <Star size={14} className="project-card__stats-icon" />
                      {item.githubRepo.stars}
                    </span>
                  )}
                </a>
              ) : item.githubRepoId ? (
                <button
                  className="project-card__icon-btn"
                  title={t(
                    "projects.repo",
                    "Repository ID: " + item.githubRepoId,
                  )}
                >
                  <Github size={20} />
                </button>
              ) : null}

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

          <p className="project-card__slug">{item.slug}</p>

          {item.techStack && item.techStack.length > 0 && (
            <div className="project-card__tech-stack">
              {item.techStack.map((tech) => (
                <span
                  key={tech.id}
                  className="project-card__tech-badge"
                  style={{
                    borderColor: tech.color || undefined,
                    color: tech.color || "inherit",
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          {item.gallery && item.gallery.length > 0 && (
            <div className="project-card__gallery">
              {item.gallery
                .sort((a, b) => a.order - b.order)
                .map((img) => (
                  <div key={img.id} className="project-card__gallery-item">
                    <img
                      src={img.url}
                      alt={img.alt || `${item.title} screenshot`}
                      loading="lazy"
                    />
                  </div>
                ))}
            </div>
          )}
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
