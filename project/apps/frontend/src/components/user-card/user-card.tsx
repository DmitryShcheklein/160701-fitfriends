import CarouselSlider from '../ui/carousel-slider/carousel-slider';
import { TrainingCardMin } from '../training-card-min/training-card-min';
import { useGetPopularTrainingsQuery } from '../../store/training-process/training-api';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const UserCard = () => {
  const navigate = useNavigate();
  const { data: items } = useGetPopularTrainingsQuery({});
  const isTrainer = true;
  const isReady = true;
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
                    <h2 className="user-card-coach__title">Валерия</h2>
                  </div>
                  <div className="user-card-coach__label">
                    <a href="popup-user-map.html">
                      <svg
                        className="user-card-coach__icon-location"
                        width="12"
                        height="14"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-location"></use>
                      </svg>
                      <span>Адмиралтейская</span>
                    </a>
                  </div>
                  <div className="user-card-coach__status-container">
                    {isTrainer ? (
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
                          TextMap[isTrainer ? 'Trainer' : 'User'][
                            isReady ? 'Ready' : 'NotReady'
                          ]
                        }
                      </span>
                    </div>
                  </div>
                  <div className="user-card-coach__text">
                    <p>
                      Привет! Меня зовут Иванова Валерия, мне 34 года.
                      Я&nbsp;профессиональный тренер по&nbsp;боксу.
                      Не&nbsp;боюсь пробовать новое, также увлекаюсь кроссфитом,
                      йогой и&nbsp;силовыми тренировками.
                    </p>
                    <p>
                      Провожу как индивидуальные тренировки, так
                      и&nbsp;групповые занятия. Помогу вам достигнуть своей цели
                      и&nbsp;сделать это с&nbsp;удовольствием!
                    </p>
                  </div>

                  {isTrainer ? (
                    <button
                      className="btn-flat user-card-coach__sertificate"
                      type="button"
                    >
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref="#icon-teacher"></use>
                      </svg>
                      <span>Посмотреть сертификаты</span>
                    </button>
                  ) : null}

                  <ul className="user-card-coach__hashtag-list">
                    <li className="user-card-coach__hashtag-item">
                      <div className="hashtag">
                        <span>#бокс</span>
                      </div>
                    </li>
                    <li className="user-card-coach__hashtag-item">
                      <div className="hashtag">
                        <span>#кроссфит</span>
                      </div>
                    </li>
                    <li className="user-card-coach__hashtag-item">
                      <div className="hashtag">
                        <span>#силовые</span>
                      </div>
                    </li>
                    <li className="user-card-coach__hashtag-item">
                      <div className="hashtag">
                        <span>#йога</span>
                      </div>
                    </li>
                  </ul>

                  <button className="btn user-card-coach__btn" type="button">
                    Добавить в друзья
                  </button>
                </div>
                <div className="user-card-coach__gallary">
                  <ul className="user-card-coach__gallary-list">
                    <li className="user-card-coach__gallary-item">
                      <img
                        src="img/content/user-coach-photo1.jpg"
                        srcSet="img/content/user-coach-photo1@2x.jpg 2x"
                        width="334"
                        height="573"
                        alt="photo1"
                      />
                    </li>
                    <li className="user-card-coach__gallary-item">
                      <img
                        src="img/content/user-coach-photo2.jpg"
                        srcSet="img/content/user-coach-photo2@2x.jpg 2x"
                        width="334"
                        height="573"
                        alt="photo2"
                      />
                    </li>
                  </ul>
                </div>
              </div>

              {isTrainer ? (
                <CarouselSlider
                  id="popular-trainings"
                  options={{ slidesPerView: 4 }}
                  title="Тренировки"
                  slides={items?.map((el) => (
                    <TrainingCardMin training={el} />
                  ))}
                />
              ) : null}

              <div className="user-card-coach__training-form">
                {isTrainer ? (
                  <button
                    className="btn user-card-coach__btn-training"
                    type="button"
                  >
                    Хочу персональную тренировку
                  </button>
                ) : null}

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
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
