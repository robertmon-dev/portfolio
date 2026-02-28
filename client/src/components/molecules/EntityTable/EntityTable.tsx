import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import type { EntityTableProps } from './types';
import './EntityTable.scss';

export const EntityTable = <T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  loadingVariant,
  onRowClick,
  className = ''
}: EntityTableProps<T>) => {
  return (
    <div className={`entity-table-container ${className}`} aria-busy={isLoading}>
      <table className="entity-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  width: col.width,
                  textAlign: col.align || 'left'
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="entity-table__body">
          <AnimatePresence mode="popLayout">
            {!isLoading && data.map((item) => (
              <motion.tr
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={onRowClick ? 'clickable' : ''}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td
                    key={`${item.id}-${col.key}`}
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.render
                      ? col.render(item)
                      : String(item[col.key as keyof T] ?? "")}
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>

          {isLoading && (
            <tr>
              <td colSpan={columns.length} className="entity-table__cell--loading">
                <div className="loading-content">
                  <Spinner variant={loadingVariant} />
                  <span>Loading data...</span>
                </div>
              </td>
            </tr>
          )}

          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="entity-table__cell--empty">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
