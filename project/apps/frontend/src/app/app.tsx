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
import PrivateRoute from '../components/base/private-route/private-route';

import { AppRoute } from '../shared/const';
import QuestionnairePage from '../pages/questionnaire/questionnaire';
import CatalogPage from '../pages/catalog/catalog';
import TrainingCardPage from '../pages/training-card/training-card';
import PurchasesPage from '../pages/my-purchases/my-purchases';
import { NoAuthRoute } from '../components/base/no-auth-route/no-auth-route';

export function App() {
  return (
    <Routes>
      <Route path={AppRoute.Intro} element={NoAuthRoute(<IntroPage />)} />

      <Route element={NoAuthRoute(<IntroLayout />)}>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
      </Route>

      <Route element={PrivateRoute(<IntroLayout />)}>
        <Route path={AppRoute.Questionnaire} element={<QuestionnairePage />} />
      </Route>

      <Route element={PrivateRoute(<MainLayout />)}>
        <Route path={AppRoute.Index} element={<IndexPage />} />
        <Route path={AppRoute.Profile} element={<ProfilePage />} />
        <Route path={AppRoute.MyPurchases} element={<PurchasesPage />} />
        <Route path={AppRoute.Catalog} element={<CatalogPage />} />
        <Route
          path={`${AppRoute.TrainingCardPage}/:id`}
          element={<TrainingCardPage />}
        />

        <Route path={AppRoute.Catalog} element={<CatalogPage />} />
      </Route>

      <Route element={<IntroLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default withProviders(() => <App />);
