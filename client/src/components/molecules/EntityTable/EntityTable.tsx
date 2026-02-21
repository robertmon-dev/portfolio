import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import type { EntityGridProps } from './types';
import './EntityGrid.scss';

export const EntityGrid = <T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  loadingVariant,
  onRowClick,
  className = ''
}: EntityGridProps<T>) => {

  return (
    <div className={`entity-grid-container ${className}`} aria-busy={isLoading}>

      <div className="entity-grid__header">
        {columns.map((col) => (
          <div
            key={col.key}
            className="entity-grid__header-cell"
            style={{
              flexBasis: col.width,
              flexGrow: col.width ? 0 : 1,
              textAlign: col.align || 'left'
            }}
          >
            {col.header}
          </div>
        ))}
      </div>

      <div className="entity-grid__body">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="entity-grid__loading"
            >
              <Spinner variant={loadingVariant} />
            </motion.div>
          ) : (
            <motion.div key="data-state" className="entity-grid__content">
              <AnimatePresence mode="popLayout">
                {data.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`entity-grid__row ${onRowClick ? 'entity-grid__row--clickable' : ''}`}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((col) => (
                      <div
                        key={`${item.id}-${col.key}`}
                        className="entity-grid__cell"
                        style={{
                          flexBasis: col.width,
                          flexGrow: col.width ? 0 : 1,
                          textAlign: col.align || 'left'
                        }}
                      >
                        {col.render
                          ? col.render(item)
                          : String(item[col.key as keyof T] ?? "")}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
