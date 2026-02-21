import type { DemoRowProps } from './types';
import './DemoRow.scss';

export const DemoRow = ({ children, className = '', vertical = false }: DemoRowProps) => {
  return (
    <div className={`demo-row ${vertical ? 'demo-row--vertical' : ''} ${className}`}>
      {children}
    </div>
  );
};
