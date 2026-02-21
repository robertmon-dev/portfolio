// Timeline.tsx
import type { TimelineGridProps } from './types';
import './Timeline.scss';

export const TimelineGrid = ({ items, className = "", gap }: TimelineGridProps) => {
  const globalStyles = gap
    ? { '--timeline-global-gap': gap } as React.CSSProperties
    : {};

  return (
    <div
      className={`timeline-grid ${className}`}
      style={globalStyles}
    >
      {items.map((item) => {
        const itemStyles = item.gapToNext
          ? { '--timeline-item-gap': item.gapToNext } as React.CSSProperties
          : {};

        return (
          <div
            key={item.id}
            className="timeline-grid__item"
            style={itemStyles}
          >
            <div className="timeline-grid__content">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};
