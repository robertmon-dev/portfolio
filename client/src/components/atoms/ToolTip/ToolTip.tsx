import type { ToolTipProps } from './types';
import { getToolTipClasses } from './styles';
import './ToolTip.scss';

export const ToolTip = ({
  children,
  content,
  position = 'top',
  delay = false,
  className = ''
}: ToolTipProps) => {
  const tooltipClasses = getToolTipClasses({ position });

  return (
    <div
      className={`tooltip-wrapper ${delay ? 'tooltip-wrapper--delay' : ''} ${className}`}
      aria-label={content}
    >
      {children}

      <div className={tooltipClasses} role="tooltip">
        {content}
      </div>
    </div>
  );
};
