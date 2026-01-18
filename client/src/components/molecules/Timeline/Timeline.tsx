import type { TimelineGridProps } from './types';
import './Timeline.scss';

export const TimelineGrid = ({ items, className = "", gap }: TimelineGridProps) => {
  const dynamicStyles = gap
    ? { '--timeline-item-gap': gap } as React.CSSProperties
    : {};

  return (
    <div
      className={`timeline-grid ${className}`}
      style={dynamicStyles}
    >
      {items.map((item) => (
        <div key={item.id} className="timeline-grid__item">
          <div className="timeline-grid__content">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};
