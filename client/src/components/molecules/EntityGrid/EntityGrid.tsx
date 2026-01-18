import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { getGridStyles } from './utils';
import type { EntityGridProps } from './types';
import './EntityGrid.scss';

export const EntityGrid = <T extends { id: string | number }>({
  data,
  renderItem,
  columns = { default: 1, md: 2, lg: 3 },
  gap = '1rem',
  isLoading,
  loadingItemsCount = 6,
  className = ''
}: EntityGridProps<T>) => {

  const gridStyles = getGridStyles(columns, gap);

  return (
    <div className={`entity-grid-container ${className}`} style={gridStyles}>
      <TransitionGroup className="entity-grid">
        {isLoading ? (
          Array.from({ length: loadingItemsCount }).map((_, idx) => (
            <div key={`skeleton-${idx}`} className="entity-grid__skeleton" />
          ))
        ) : (
          data.map((item) => (
            <CSSTransition
              key={item.id}
              timeout={300}
              classNames="grid-item-anim"
            >
              <div className="entity-grid__item">
                {renderItem(item)}
              </div>
            </CSSTransition>
          ))
        )}
      </TransitionGroup>
    </div>
  );
};
