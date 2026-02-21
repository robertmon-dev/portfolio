import { useTranslation } from "react-i18next";
import { Card } from "@/components/atoms/Card/Card";
import { DemoSection } from "@/components/molecules/Sections/Demo/DemoSection";

export const CardsSection = () => {
  const { t } = useTranslation();

  return (
    <DemoSection
      title={t("demo.sections.cards.title", "7. Cards (Variants & Interactions)")}
    >
      <div
        className="demo-section__grid demo-section__grid--3col"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        <Card variant="elevated" padding="md">
          <h3 className="demo-list-title" style={{ margin: "0 0 8px 0" }}>
            Elevated
          </h3>
          <p className="text-muted m-0" style={{ fontSize: "0.85rem" }}>
            {t(
              "demo.cards.elevatedDesc",
              "Default variant with a subtle shadow and background.",
            )}
          </p>
        </Card>

        <Card variant="outlined" padding="md">
          <h3 className="demo-list-title" style={{ margin: "0 0 8px 0" }}>
            Outlined
          </h3>
          <p className="text-muted m-0" style={{ fontSize: "0.85rem" }}>
            {t(
              "demo.cards.outlinedDesc",
              "No background, border only. Perfect for grouping content.",
            )}
          </p>
        </Card>

        <Card variant="flat" padding="md">
          <h3 className="demo-list-title" style={{ margin: "0 0 8px 0" }}>
            Flat
          </h3>
          <p className="text-muted m-0" style={{ fontSize: "0.85rem" }}>
            {t(
              "demo.cards.flatDesc",
              "Flat, slightly darkened background. Good for nesting.",
            )}
          </p>
        </Card>

        <Card variant="transparent" padding="md">
          <h3 className="demo-list-title" style={{ margin: "0 0 8px 0" }}>
            Transparent
          </h3>
          <p className="text-muted m-0" style={{ fontSize: "0.85rem" }}>
            {t(
              "demo.cards.transparentDesc",
              "Completely transparent, preserves only padding.",
            )}
          </p>
        </Card>

        <Card variant="floating" padding="md">
          <h3 className="demo-list-title" style={{ margin: "0 0 8px 0" }}>
            Floating
          </h3>
          <p className="text-muted m-0" style={{ fontSize: "0.85rem" }}>
            {t(
              "demo.cards.floatingDesc",
              "Strong drop-shadow. Great for modals or dropdowns.",
            )}
          </p>
        </Card>

        <Card
          variant="levitating"
          interactive
          padding="md"
          style={{ cursor: "pointer" }}
        >
          <h3
            className="demo-list-title"
            style={{ margin: "0 0 8px 0", color: "var(--tn-blue)" }}
          >
            Levitating (Interactive)
          </h3>
          <p className="text-muted m-0" style={{ fontSize: "0.85rem" }}>
            {t(
              "demo.cards.levitatingDesc",
              "Hover over me! The card lifts and gains a glow.",
            )}
          </p>
        </Card>
      </div>
    </DemoSection>
  );
};
