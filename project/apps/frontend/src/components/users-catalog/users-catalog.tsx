import { Link } from 'react-router-dom';
import { Sidebar } from '../base/sidebar/sidebar';
import { AppRoute } from '../../shared/const';
import classNames from 'classnames';

export const UsersCatalog = () => {
  return (
    <>
      <section className="inner-page">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог пользователей</h1>

          <Sidebar>
            <Link
              to={AppRoute.Index}
              className="btn-flat btn-flat--underlined user-catalog-form__btnback"
              type="button"
            >
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
              <span>Назад</span>
            </Link>
          </Sidebar>

          <div className="inner-page__content">
            <div className="users-catalog">
              <ul className="users-catalog__list">
                <li className="users-catalog__item">
                  <div
                    className={classNames('thumbnail-user', {
                      ['thumbnail-user--role-user']: !!1,
                      ['thumbnail-user--role-coach']: !!0,
                    })}
                  >
                    <div className="thumbnail-user__image">
                      <img
                        src="img/content/thumbnails/user-01.jpg"
                        width="82"
                        height="82"
                        alt=""
                      />
                    </div>
                    <div className="thumbnail-user__header">
                      <h3 className="thumbnail-user__name">Елизавета</h3>
                      <div className="thumbnail-user__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-user__location-address">
                          Петроградская
                        </address>
                      </div>
                    </div>
                    <ul className="thumbnail-user__hashtags-list">
                      <li className="thumbnail-user__hashtags-item">
                        <div className="hashtag thumbnail-user__hashtag">
                          <span>#стретчинг</span>
                        </div>
                      </li>
                      <li className="thumbnail-user__hashtags-item">
                        <div className="hashtag thumbnail-user__hashtag">
                          <span>#йога</span>
                        </div>
                      </li>
                    </ul>
                    <Link
                      to={`${AppRoute.UserCard}`}
                      className="btn btn--medium thumbnail-user__button"
                    >
                      Подробнее
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
