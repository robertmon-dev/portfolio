import type { ReactNode } from "react";
import './Header.scss';

export const formatTagContent = (label: ReactNode): ReactNode => {
  if (typeof label !== 'string' || !label.includes(':')) return label;

  const [key, ...valueParts] = label.split(':');
  const value = valueParts.join(':');

  return (
    <span className="header__tag-inner">
      <span className="header__tag-key">{key}:</span>
      <span className="header__tag-value">{value}</span>
    </span>
  );
};
