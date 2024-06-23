import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  ariaLabel: string;
  notifications?: boolean;
  onClick?: () => void;
}

interface MainNavProps {
  items: NavItem[];
}

const MainNav: React.FC<MainNavProps> = ({ items }) => {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {items.map(
          ({ href, ariaLabel, icon, notifications, onClick }, index) => (
            <li
              key={index}
              className={`main-nav__item ${
                notifications ? 'main-nav__item--notifications' : ''
              }`}
            >
              <NavLink
                className={({ isActive }) =>
                  classNames('main-nav__link', { 'is-active': isActive })
                }
                to={href}
                aria-label={ariaLabel}
                title={ariaLabel}
                onClick={onClick}
              >
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref={icon}></use>
                </svg>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
