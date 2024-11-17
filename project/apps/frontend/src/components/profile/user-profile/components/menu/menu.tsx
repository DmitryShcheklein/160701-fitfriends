import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../../shared/const';
import EmptyBlock from '../../../../base/empty-block/empty-block';
import { useGetCurrentUserQuery } from '../../../../../store/user-process/user-api';

export const Menu = () => {
  const { data: currentUser } = useGetCurrentUserQuery();

  const data = [
    // {
    //   icon: '#icon-friends',
    //   name: 'Мои друзья',
    //   hrefLink: AppRoute.Friends,
    // },
    {
      icon: '#icon-shopping-cart',
      name: 'Мои покупки',
      hrefLink: AppRoute.MyPurchases,
    },
    {
      icon: '#icon-friends',
      name: 'Моя страница',
      hrefLink: `${AppRoute.UserCard}/${currentUser?.id}`,
    },
  ];

  return (
    <div className="personal-account-user">
      <div className="personal-account-user__additional-info">
        <EmptyBlock />
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
