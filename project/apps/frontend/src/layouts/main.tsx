import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import ScrollToTop from '../components/scroll-to-top/scroll-to-top';
import {
  getAccessToken,
  getAuthorizationStatus,
  getRefreshToken,
} from '../store/auth-process/selectors';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useCheckAuthQuery } from '../store/auth-process/auth-api';
import { useEffect } from 'react';
import { logOut, setCredentials } from '../store/auth-process/auth-process';
import { LoaderPage } from '../components/loaders/loader-page/loader-page';
import { AppRoute, AuthStatus } from '../shared/const';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const refreshToken = useAppSelector(getRefreshToken);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isUnknown = authStatus === AuthStatus.Unknown;

  const {
    data: user,
    error,
    isLoading,
  } = useCheckAuthQuery(undefined, { skip: !accessToken });

  useEffect(() => {
    if (user) {
      dispatch(
        setCredentials({ accessToken, refreshToken, email: user.email })
      );
    } else if (error) {
      dispatch(logOut());
    }
  }, [user, error, dispatch, accessToken, refreshToken]);

  if (!accessToken) {
    return <Navigate to={AppRoute.Intro} />;
  }

  if (isLoading || isUnknown) {
    return <LoaderPage />;
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
