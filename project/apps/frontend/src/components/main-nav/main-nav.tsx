import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  ariaLabel: string;
  notifications?: boolean;
}

interface MainNavProps {
  items: NavItem[];
}

const MainNav: React.FC<MainNavProps> = ({ items }) => {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {items.map(({ href, ariaLabel, icon, notifications }, index) => (
          <li
            key={index}
            className={`main-nav__item ${
              notifications ? 'main-nav__item--notifications' : ''
            }`}
          >
            <Link
              className="main-nav__link"
              to={href}
              aria-label={ariaLabel}
              title={ariaLabel}
            >
              <svg width="18" height="18" aria-hidden="true">
                <use xlinkHref={icon}></use>
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;
