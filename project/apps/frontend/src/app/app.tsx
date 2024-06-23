import withProviders from '../providers';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../shared/const';
import IntroPage from '../pages/intro/intro';
import Page404 from '../pages/404/404';
import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/register/register';
import IntroLayout from '../layouts/intro';
import MainLayout from '../layouts/main';
import IndexPage from '../pages/index';
import ProfilePage from '../pages/profile/profile';
import PrivateRoute from '../components/private-route/private-route';

export function App() {
  return (
    <>
      <ToastContainer />
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
              // <PrivateRoute>
              <IndexPage />
              // </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Profile}
            element={
              // <PrivateRoute>
              <ProfilePage />
              // </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default withProviders(App);
