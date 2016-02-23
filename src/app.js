/**
 * Created by glenn on 12/02/16.
 */

import './styles';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import { DATA_TYPE } from './constants';
import { auth } from './auth';

import { BolpaxAdministrator } from './components/bolpax-administrator';
import { Login } from './components/login';
import { Dashboard } from './components/dashboard';
import { MainContent } from './components/dashboard/main-content';
import { C404 } from './components/c404';

const history = useRouterHistory(createHashHistory)({ queryKey: false });
const { TRANSACTION, ISSUE } = DATA_TYPE;

function requireAuth(nextState, replace) {
  //if (!auth.isLoggedIn()) {
  //  replace({
  //    pathname: '/login',
  //    state   : { nextPathname: nextState.location.pathname }
  //  });
  //}
}

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={BolpaxAdministrator}>
      <IndexRedirect to="dashboard" />
      <Route path="login" component={Login} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth}>
        <IndexRoute component={() => <MainContent dataType={TRANSACTION} />} />
        <Route path="issues" component={() => <MainContent dataType={ISSUE} />} />
      </Route>
    </Route>
    <Route path="/*" component={C404} />
  </Router>,
  document.querySelector('#app')
);
