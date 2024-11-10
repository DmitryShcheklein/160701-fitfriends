import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../../shared/const';

const data = [
  {
    icon: '#icon-flash',
    name: 'Мои тренировки',
    hrefLink: AppRoute.MyTrainings,
  },
  {
    icon: '#icon-add',
    name: 'Создать тренировку',
    hrefLink: AppRoute.CreateTraining,
  },
  {
    icon: '#icon-friends',
    name: 'Мои друзья',
    hrefLink: AppRoute.Friends,
  },
  {
    icon: '#icon-bag',
    name: 'Мои заказы',
    hrefLink: AppRoute.Orders,
  },
];

export const Menu = () => {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        {data.map(({ hrefLink, name, icon }) => (
          <Link
            to={hrefLink}
            className="thumbnail-link thumbnail-link--theme-light"
            key={name}
          >
            <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
              <svg width="30" height="26" aria-hidden="true">
                <use xlinkHref={icon}></use>
              </svg>
            </div>
            <span className="thumbnail-link__text">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
