import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Link = (props: LinkProps) => {
  const className = `${props.className}${props.isActive ? ' active' : ''}${
    props.isDisabled ? ' disabled' : ''
  }`;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!props.onClick) return;

    e.preventDefault();
    props.onClick;
  };

  return (
    <NavLink className={className} to={props.href} onClick={onClick}>
      {props.children}
    </NavLink>
  );
};
