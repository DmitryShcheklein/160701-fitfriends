import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FriendsWithPaginationRdo } from '@project/rdo';
import { LoaderPage } from '../base/loaders/loader-page/loader-page';
import { useGetUserFriendsQuery } from '../../store/friends-process/friends-api';
import { locationOptions } from '../../shared/data';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../shared/const';

export const FriendsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetUserFriendsQuery({
    limit: 6,
    page: currentPage,
  });

  const [items, setItems] = useState<FriendsWithPaginationRdo['entities']>([]);

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
    <section className="friends-list">
      <div className="friends-list__wrapper">
        <Link to={AppRoute.Profile} className="btn-flat friends-list__back">
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </Link>
        <div className="friends-list__title-wrapper">
          <h1 className="friends-list__title">Мои друзья</h1>
        </div>

        {!items.length ? <h3 className="">Список друзей пуст</h3> : null}
        {items.length ? (
          <ul className="friends-list__list">
            {items.map(({ friend }) => {
              const { firstName, location, role, avatarPath, trainingConfig } =
                friend;
              const isReady = trainingConfig?.trainingReadiness;
              const isUser = role === 'user';
              const isTrainer = role === 'trainer';

              const StatusMap = {
                isPending: false, // request.status === 'Pending',
                isRejected: false, // request.status === 'Rejected',
                isAccepted: false, // request.status === 'Accepted',
              };
              const statusText = (
                <>
                  {isUser && <>Запрос на&nbsp;совместную тренировку</>}
                  {isTrainer && <>Запрос на&nbsp;персональную тренировку</>}
                  &nbsp;
                  {StatusMap.isAccepted && 'Принят'}
                  {StatusMap.isRejected && 'Отклонён'}
                </>
              );

              return (
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div
                      className={classNames('thumbnail-friend__info', {
                        ['thumbnail-friend__info--theme-light']: isUser,
                        ['thumbnail-friend__info--theme-dark']: isTrainer,
                      })}
                    >
                      <div className="thumbnail-friend__image-status">
                        {avatarPath ? (
                          <div className="thumbnail-friend__image">
                            <picture>
                              <img
                                src={avatarPath}
                                width="78"
                                height="78"
                                alt=""
                              />
                            </picture>
                          </div>
                        ) : null}
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">{firstName}</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">
                            {
                              locationOptions.find(
                                (el) => el.value === location
                              )?.label
                            }
                          </address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag">
                            <span>#стретчинг</span>
                          </div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        {trainingConfig?.trainingReadiness ? (
                          <div
                            className={classNames(
                              'thumbnail-friend__ready-status',
                              {
                                ['thumbnail-friend__ready-status--is-ready']:
                                  isReady,
                                ['thumbnail-friend__ready-status--is-not-ready']:
                                  !isReady,
                              }
                            )}
                          >
                            {isReady && <span>Готов к&nbsp;тренировке</span>}
                            {!isReady && (
                              <span>Не готов к&nbsp;тренировке</span>
                            )}
                          </div>
                        ) : null}

                        {isUser && !StatusMap.isAccepted && isReady ? (
                          <button
                            className={classNames(
                              'thumbnail-friend__invite-button',
                              { ['is-disabled']: StatusMap.isRejected }
                            )}
                            type="button"
                          >
                            <svg
                              width="43"
                              height="46"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <use xlinkHref="#icon-invite"></use>
                            </svg>
                            <span className="visually-hidden">
                              Пригласить друга на совместную тренировку
                            </span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                    {isReady ? (
                      <div
                        className={classNames(
                          'thumbnail-friend__request-status',
                          {
                            ['thumbnail-friend__request-status--role-user']:
                              isUser,
                            ['thumbnail-friend__request-status--role-coach']:
                              isTrainer,
                          }
                        )}
                      >
                        <p className="thumbnail-friend__request-text">
                          {statusText}
                        </p>
                        {StatusMap.isPending ? (
                          <div className="thumbnail-friend__button-wrapper">
                            <button
                              className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                              type="button"
                            >
                              Принять
                            </button>
                            <button
                              className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                              type="button"
                            >
                              Отклонить
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}

        {data?.totalPages && data?.totalPages !== 1 ? (
          <div className="show-more friends-list__show-more">
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
    </section>
  );
};
