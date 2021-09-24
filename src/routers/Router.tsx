import { FC } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from 'routers/PrivateRoute';

import HomePage from 'pages/public/HomePage';
import DashboardPage from 'pages/private/DashboardPage';
import NotFoundPage from 'pages/public/NotFoundPage';
import LoginPage from 'pages/public/LoginPage';

const Router: FC = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/dashboard" component={DashboardPage} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
