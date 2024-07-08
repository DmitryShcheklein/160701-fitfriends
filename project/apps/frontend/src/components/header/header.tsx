import React from 'react';
import classNames from 'classnames';
import MainNav from '../main-nav/main-nav';
import { navItems } from '../main-nav/main-nav.data';
import { AppRoute } from '../../shared/const';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className={classNames('header')} id="header">
      <div className="container">
        <Link to={AppRoute.Index} className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </Link>

        <MainNav items={navItems} />
      </div>
    </header>
  );
};

export default Header;
