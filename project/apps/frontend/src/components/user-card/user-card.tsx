import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../store/user-process/user-api';
import { locationOptions, specializationOptions } from '../../shared/data';
import { TrainingsSlider } from './trainings-slider/trainings-slider';
import { UserRole } from '@project/enums';
import { useAuthRole } from '../../hooks/useAuth';
import {
  useAddFriendMutation,
  useCheckExistFriendQuery,
  useDeleteFriendMutation,
} from '../../store/friends-process/friends-api';

export const UserCard = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userIdCurrentPage = String(id);
  const { isUserAuth } = useAuthRole();
  const [addFriend, { isLoading: isLoadingAdd }] = useAddFriendMutation();
  const [deleteFriend, { isLoading: isLoadingDelete }] =
    useDeleteFriendMutation();

  const { data: userCurrentPage } = useGetUserByIdQuery(userIdCurrentPage);
  const { data: { status: isInFriends } = {} } = useCheckExistFriendQuery(
    String(id),
    {
      skip: !id,
    }
  );

  if (!userCurrentPage) {
    return null;
  }

  const isCurrentPageUserTrainer = userCurrentPage.role === UserRole.Trainer;

  const { trainingConfig } = userCurrentPage;
  const specializations = trainingConfig?.specialisation;
  const isReady = trainingConfig?.trainingReadiness;
  const TextMap = {
    Trainer: {
      Ready: 'Готов тренировать',
      NotReady: 'Не готов тренировать',
    },
    User: {
      Ready: 'Готов к тренировке',
      NotReady: 'Не готов к тренировке',
    },
  };

  const handleFriendBtn = async () => {
    try {
      if (isInFriends) {
        await deleteFriend(id);

        return;
      }

      await addFriend(id);
    } catch (error) {
      console.error('Failed to add: ', error);
    }
  };

  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="inner-page__wrapper">
        <button
          onClick={() => navigate(-1)}
          className="btn-flat inner-page__back"
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </button>
        <div className="inner-page__content">
          <section className="user-card-coach">
            <h1 className="visually-hidden">
              Карточка пользователя роль тренер
            </h1>
            <div className="user-card-coach__wrapper">
              <div className="user-card-coach__card">
                <div className="user-card-coach__content">
                  <div className="user-card-coach__head">
                    <h2 className="user-card-coach__title">
                      {userCurrentPage.firstName}
                    </h2>
                  </div>
                  <div className="user-card-coach__label">
                    <svg
                      className="user-card-coach__icon-location"
                      width="12"
                      height="14"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-location"></use>
                    </svg>
                    <span>
                      {
                        locationOptions.find(
                          (el) => el.value === userCurrentPage.location
                        )?.label
                      }
                    </span>
                  </div>
                  <div className="user-card-coach__status-container">
                    {isCurrentPageUserTrainer ? (
                      <div className="user-card-coach__status user-card-coach__status--tag">
                        <svg
                          className="user-card-coach__icon-cup"
                          width="12"
                          height="13"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-cup"></use>
                        </svg>
                        <span>Тренер</span>
                      </div>
                    ) : null}

                    <div
                      className={classNames({
                        ['user-card-coach__status user-card-coach__status--check']:
                          isReady,
                        ['user-card-coach-2__status user-card-coach-2__status--check']:
                          !isReady,
                      })}
                    >
                      <span>
                        {
                          TextMap[
                            isCurrentPageUserTrainer ? 'Trainer' : 'User'
                          ][isReady ? 'Ready' : 'NotReady']
                        }
                      </span>
                    </div>
                  </div>

                  {userCurrentPage.description ? (
                    <div className="user-card-coach__text">
                      <p>{userCurrentPage.description}</p>
                    </div>
                  ) : null}

                  {isCurrentPageUserTrainer ? (
                    <button
                      className="btn-flat user-card-coach__sertificate"
                      type="button"
                      style={{ display: 'none' }}
                    >
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref="#icon-teacher"></use>
                      </svg>
                      <span>Посмотреть сертификаты</span>
                    </button>
                  ) : null}

                  {specializations?.length ? (
                    <ul className="user-card-coach__hashtag-list">
                      {trainingConfig?.specialisation.map((el) => (
                        <li className="user-card-coach__hashtag-item" key={el}>
                          <div className="hashtag">
                            <span>
                              #
                              {
                                specializationOptions.find(
                                  (option) => option.value === el
                                )?.label
                              }
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {isUserAuth ? (
                    <button
                      disabled={isLoadingAdd || isLoadingDelete}
                      onClick={handleFriendBtn}
                      className="btn user-card-coach__btn"
                      type="button"
                    >
                      {!isInFriends && 'Добавить в друзья'}
                      {isInFriends && 'Удалить из друзей'}
                    </button>
                  ) : null}
                </div>
                {userCurrentPage?.avatarPath ? (
                  <div className="user-card-coach__gallary">
                    <ul className="user-card-coach__gallary-list">
                      <li className="user-card-coach__gallary-item">
                        <img
                          src={userCurrentPage.avatarPath}
                          width="334"
                          height="573"
                          alt="photo1"
                        />
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>

              {isCurrentPageUserTrainer ? (
                <TrainingsSlider trainerId={userCurrentPage.id} />
              ) : null}
              {isUserAuth && isCurrentPageUserTrainer ? (
                <div className="user-card-coach__training-form">
                  {isCurrentPageUserTrainer ? (
                    <button
                      className="btn user-card-coach__btn-training"
                      type="button"
                    >
                      Хочу персональную тренировку
                    </button>
                  ) : null}

                  {isCurrentPageUserTrainer ? (
                    <div className="user-card-coach__training-check">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="user-agreement-1"
                            name="user-agreement"
                            checked
                          />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">
                            Получать уведомление на почту о новой тренировке
                          </span>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
