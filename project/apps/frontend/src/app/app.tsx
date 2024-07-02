import withProviders from '../providers';
import { Route, Routes } from 'react-router-dom';
import IntroPage from '../pages/intro/intro';
import Page404 from '../pages/404/404';
import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/register/register';
import IntroLayout from '../layouts/intro';
import MainLayout from '../layouts/main';
import IndexPage from '../pages/index';
import ProfilePage from '../pages/profile/profile';
import PrivateRoute from '../components/private-route/private-route';
import {
  getAccessToken,
  getRefreshToken,
} from '../store/auth-process/selectors';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useCheckAuthQuery } from '../store/auth-process/auth-api';
import { useEffect } from 'react';
import { logOut, setCredentials } from '../store/auth-process/auth-process';
import { AppRoute } from '../shared/const';

export function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const refreshToken = useAppSelector(getRefreshToken);

  const { data: user, error } = useCheckAuthQuery(undefined, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (user) {
      dispatch(
        setCredentials({ accessToken, refreshToken, email: user.email })
      );
    } else if (error) {
      dispatch(logOut());
    }
  }, [user, error, dispatch, accessToken, refreshToken]);

  return (
    <Routes>
      <Route path={AppRoute.Intro} element={<IntroPage />} />

      <Route element={<IntroLayout />}>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path={AppRoute.Index}
          element={
            <PrivateRoute>
              <IndexPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Profile}
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default withProviders(() => <App />);
