import React, { lazy, Suspense, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LoadingGif } from './components/elements/Loading';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser, logout } from './actions/register';
import PrivateRoute from './utils/routing/PrivateRoute';
import './components/styles/main.css';

const Alerts = lazy(() => import('./components/elements/Alerts'));
const Login = lazy(() => import('./components/AuthPages/Login'));
const Register = lazy(() => import('./components/AuthPages/Register'));
const Confirm = lazy(() => import('./components/AuthPages/Confirm'));
const Forgot = lazy(() => import('./components/AuthPages/Forgot'));

const Landing = lazy(() => import('./components/Landing'));

const Home = lazy(() => import('./components/Pages/Home'));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    const handleInvalidToken = (e) => {
      if (e.key === 'token' && e.oldValue && !e.newValue) {
        store.dispatch(logout());
      }
    };
    window.addEventListener('storage', handleInvalidToken);
    return function cleanup() {
      window.removeEventListener('storage', handleInvalidToken);
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={LoadingGif}>
          <Fragment>
            <section>
              <Alerts />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/confirm/:token" component={Confirm} />

                <Route exact path="/" component={Landing} />

                <PrivateRoute exact path="/home" component={Home} />
                <Redirect from="*" to="/" />
              </Switch>
            </section>
          </Fragment>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
