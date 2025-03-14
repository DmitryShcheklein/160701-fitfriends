import { Link } from 'react-router-dom';
import { AppRoute, getPageTitle } from '../../shared/const';
import { Helmet } from 'react-helmet-async';
import React from 'react';

const IntroPage = () => {
  return (
    <div className="wrapper">
      <Helmet>
        <title>{getPageTitle('Intro')}</title>
      </Helmet>
      <main>
        <div className="intro">
          <div className="intro__background">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/sitemap/background.webp, img/content/sitemap/background@2x.webp 2x"
              />
              <img
                src="img/content/sitemap/background.jpg"
                srcSet="img/content/sitemap/background@2x.jpg 2x"
                width="1440"
                height="1024"
                alt="Фон с бегущей девушкой"
              />
            </picture>
          </div>
          <div className="intro__wrapper">
            <Link to={AppRoute.Index}>
              <svg
                className="intro__icon"
                width="60"
                height="60"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-logotype"></use>
              </svg>
            </Link>
            <div className="intro__title-logo">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/sitemap/title-logo.webp, img/content/sitemap/title-logo@2x.webp 2x"
                />
                <img
                  src="img/content/sitemap/title-logo.png"
                  srcSet="img/content/sitemap/title-logo@2x.png 2x"
                  width="934"
                  height="455"
                  alt="Логотип Fit Friends"
                />
              </picture>
            </div>
            <div className="intro__buttons">
              <Link className="btn intro__button" to={AppRoute.Register}>
                Регистрация
              </Link>
              <p className="intro__text">
                Есть аккаунт?
                <Link className="intro__link" to={AppRoute.Login}>
                  {' '}
                  Вход
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntroPage;
