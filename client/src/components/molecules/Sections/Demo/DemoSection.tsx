import { DemoSectionProps } from './types';
import './DemoSection.scss';

export const DemoSection = ({
  title,
  description,
  action,
  children,
  className = '',
  columns = 1
}: DemoSectionProps) => {
  return (
    <section className={`demo-section ${className} ${columns === 2 ? 'demo-section--2col' : ''}`}>
      <div className="demo-section__header">
        <div className="demo-section__info">
          <h2 className="demo-section__title">{title}</h2>
          {description && <p className="demo-section__description">{description}</p>}
        </div>
        {action && <div className="demo-section__action">{action}</div>}
      </div>

      <div className="demo-section__body">
        {children}
      </div>
    </section>
  );
};
