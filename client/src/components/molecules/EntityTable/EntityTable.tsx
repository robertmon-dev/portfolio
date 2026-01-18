import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Spinner } from '../../atoms/Spinner/Spinner';
import type { EntityTableProps } from './types';
import './EntityTable.scss';

export const EntityTable = <T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  loadingVariant = 'hash',
  onRowClick,
  className = ''
}: EntityTableProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className={`entity-table-container ${className}`}>
      <table className="entity-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-${col.align || 'left'}`}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <TransitionGroup component="tbody">

          {isLoading ? (
            <tr key="loading-row">
              <td colSpan={columns.length} className="entity-table__cell--loading">
                <div className="loading-content">
                  <Spinner variant={loadingVariant} size={40} />

                  <span style={{ marginTop: '1rem', display: 'block', opacity: 0.7 }}>
                    {t('common.loading', 'Ładowanie danych...')}
                  </span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr key="empty-row">
              <td colSpan={columns.length} className="entity-table__cell--empty">
                {t('table.noData', 'Brak danych do wyświetlenia.')}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <CSSTransition
                key={row.id}
                timeout={300}
                classNames="table-row"
              >
                <tr
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'clickable' : ''}
                >
                  {columns.map((col) => (
                    <td key={`${row.id}-${col.key}`} className={`text-${col.align || 'left'}`}>
                      {col.render
                        ? col.render(row)
                        : (row[col.key as keyof T] as ReactNode)
                      }
                    </td>
                  ))}
                </tr>
              </CSSTransition>
            ))
          )}
        </TransitionGroup>
      </table>
    </div>
  );
};

export type { Column } from './types';
