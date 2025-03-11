import { Link } from 'react-router-dom';
import { Sidebar } from '../base/sidebar/sidebar';
import { AppRoute } from '../../shared/const';
import classNames from 'classnames';
import { LoaderPage } from '../base/loaders/loader-page/loader-page';
import { useEffect, useState } from 'react';
import { UsersWithPaginationRdo } from '@project/rdo';
import { useGetAllUsersQuery } from '../../store/user-process/user-api';
import { UserRole } from '@project/enums';
import { locationOptions, specializationOptions } from '../../shared/data';

export const UsersCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllUsersQuery();
  const [items, setItems] = useState<UsersWithPaginationRdo['entities']>([]);

  useEffect(() => {
    if (data?.entities) {
      setItems((prev) => [...prev, ...data.entities]);
    }
  }, [data]);

  const handleShowMore = () => {
    if (currentPage < Number(data?.totalPages)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleToTop = () => {
    setCurrentPage(1);
    setItems([]);
  };

  if (isLoading) {
    return <LoaderPage />;
  }

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
                {items.map((user) => {
                  const {
                    id,
                    role,
                    avatarPath,
                    firstName,
                    location,
                    trainingConfig,
                  } = user;

                  return (
                    <li className="users-catalog__item" key={id}>
                      <div
                        className={classNames('thumbnail-user', {
                          ['thumbnail-user--role-user']:
                            role === UserRole.User || role === UserRole.Admin,
                          ['thumbnail-user--role-coach']:
                            role === UserRole.Trainer,
                        })}
                      >
                        {avatarPath ? (
                          <div className="thumbnail-user__image">
                            <img
                              src={avatarPath}
                              width="82"
                              height="82"
                              alt=""
                            />
                          </div>
                        ) : null}
                        <div className="thumbnail-user__header">
                          <h3 className="thumbnail-user__name">{firstName}</h3>
                          <div className="thumbnail-user__location">
                            <svg width="14" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-location"></use>
                            </svg>
                            <address className="thumbnail-user__location-address">
                              {
                                locationOptions.find(
                                  (el) => el.value === location
                                )?.label
                              }
                            </address>
                          </div>
                        </div>
                        {trainingConfig?.specialisation ? (
                          <ul className="thumbnail-user__hashtags-list">
                            {trainingConfig?.specialisation.map((item) => (
                              <li
                                className="thumbnail-user__hashtags-item"
                                key={item}
                              >
                                <div className="hashtag thumbnail-user__hashtag">
                                  <span>
                                    #
                                    {
                                      specializationOptions.find(
                                        (el) => el.value === item
                                      )?.label
                                    }
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <Link
                          to={`${AppRoute.UserCard}/${id}`}
                          className="btn btn--medium thumbnail-user__button"
                        >
                          Подробнее
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {data?.totalPages && data?.totalPages !== 1 ? (
                <div className="show-more users-catalog__show-more">
                  {currentPage < Number(data?.totalPages) ? (
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={handleShowMore}
                    >
                      Показать еще
                    </button>
                  ) : (
                    <button
                      className="btn show-more__button show-more__button--to-top"
                      type="button"
                      onClick={handleToTop}
                    >
                      Вернуться в начало
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
