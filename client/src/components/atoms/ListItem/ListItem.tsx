import { forwardRef } from 'react';
import type { ListItemProps } from './types';
import { getListItemClasses } from './styles';
import './ListItem.scss';

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const {
    children,
    icon,
    href,
    isActive = false,
    variant = 'default',
    status,
    disabled = false,
    className = '',
    external = false,
    onClick,
    ...rest
  } = props;

  const classes = getListItemClasses({
    variant,
    status,
    isActive,
    disabled,
    className
  });

  const content = (
    <>
      {icon && <span className="list-item__icon">{icon}</span>}
      <span className="list-item__text">{children}</span>

      {isActive && (variant === 'nav' || variant === 'side') && (
        <span className="list-item__indicator" />
      )}
    </>
  );

  const innerElement = href ? (
    <a
      href={href}
      className="list-item__link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={(e) => disabled ? e.preventDefault() : onClick?.(e as any)}
    >
      {content}
    </a>
  ) : (
    <div className="list-item__content" onClick={disabled ? undefined : onClick as any}>
      {content}
    </div>
  );

  return (
    <li ref={ref} className={classes} {...rest}>
      {innerElement}
    </li>
  );
});

ListItem.displayName = 'ListItem';
