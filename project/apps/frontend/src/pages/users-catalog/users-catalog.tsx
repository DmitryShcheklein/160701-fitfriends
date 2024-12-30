import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import { UsersCatalog } from '../../components/users-catalog/users-catalog';

export const UsersCatalogPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('UsersCatalog')}</title>
      </Helmet>

      <UsersCatalog />
    </>
  );
};
