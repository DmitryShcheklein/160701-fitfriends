import withProviders from '../providers';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../shared/const';
import IntroPage from '../pages/intro/intro';
import Page404 from '../pages/404/404';
import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/register/register';

export function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={AppRoute.Root} element={<IntroPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default withProviders(App);
