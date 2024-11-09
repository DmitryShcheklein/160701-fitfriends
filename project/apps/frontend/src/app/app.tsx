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
import PurchasesPage from '../pages/purchases/purchases';

export function App() {
  return (
    <Routes>
      <Route path={AppRoute.Intro} element={<IntroPage />} />

      <Route element={<IntroLayout />}>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route
          path={AppRoute.Questionnaire}
          element={PrivateRoute(<QuestionnairePage />)}
        />
        <Route path="*" element={<Page404 />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path={AppRoute.Index} element={PrivateRoute(<IndexPage />)} />
        <Route
          path={AppRoute.Profile}
          element={PrivateRoute(<ProfilePage />)}
        />
        <Route
          path={AppRoute.Purchases}
          element={PrivateRoute(<PurchasesPage />)}
        />
        <Route
          path={AppRoute.Catalog}
          element={PrivateRoute(<CatalogPage />)}
        />
        <Route
          path={`${AppRoute.TrainingCardPage}/:id`}
          element={PrivateRoute(<TrainingCardPage />)}
        />
      </Route>
    </Routes>
  );
}

export default withProviders(() => <App />);
