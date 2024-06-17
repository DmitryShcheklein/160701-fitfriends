import React, { FC } from 'react';
import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

export interface HistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

const HistoryRouter = ({ basename, children, history }: HistoryRouterProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

const withRouter =
  (component: () => React.ReactNode): FC =>
  () => {
    return (
      <HistoryRouter history={browserHistory}>{component()}</HistoryRouter>
    );
  };

export default withRouter;
