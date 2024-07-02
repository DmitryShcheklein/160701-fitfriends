import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import ScrollToTop from '../components/scroll-to-top/scroll-to-top';
import { AppRoute, AuthStatus } from '../shared/const';
import { useAppSelector } from '../hooks';
import {
  getAccessToken,
  getAuthorizationStatus,
} from '../store/auth-process/selectors';
import { LoaderPage } from '../components/loaders/loader-page/loader-page';
import { useCheckAuthQuery } from '../store/auth-process/auth-api';

const MainLayout = () => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isUnknown = authStatus === AuthStatus.Unknown;
  const accessToken = useAppSelector(getAccessToken);
  const { isLoading } = useCheckAuthQuery(undefined, {
    skip: !accessToken,
  });

  if (isLoading || isUnknown) {
    return <LoaderPage />;
  }
  if (!accessToken) {
    return <Navigate to={AppRoute.Intro} />;
  }

  return (
    <>
      <ScrollToTop />

      <div className="wrapper">
        <Header />
        <main>
          <section className="">
            <div className="container">
              <Outlet />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
