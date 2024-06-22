import { Outlet } from 'react-router-dom';

import Header from '../components/header/header';
import ScrollToTop from '../components/scroll-to-top/scroll-to-top';
import {
  getAccessToken,
  getRefreshToken,
} from '../store/auth-process/selectors';
import { useAppDispatch, useAppSelector } from '../hooks';

import { useCheckAuthQuery } from '../store/auth-process/auth-api';
import { useEffect } from 'react';
import { logOut, setCredentials } from '../store/auth-process/auth-process';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const refreshToken = useAppSelector(getRefreshToken);

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

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <ScrollToTop />

      <div className="wrapper">
        <Header />
        <main>
          <section className="inner-page">
            <div className="container">
              {isLoading ? <>Loading...</> : <Outlet />}
            </div>
          </section>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default MainLayout;
