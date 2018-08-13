import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { setCurrentUser, logoutUser } from './actions/auth';
import { clearCurrentProfile } from './actions/profile';
import jwt_decode from 'jwt-decode';

import asyncComponent from './Async';
import AppRoutes from './components/hoc/AppRoutes';
import PrivateRoute from './components/hoc/PrivateRoute';
import Layout from './components/layout/Layout';
import Blank from './components/layout/Blank';
import Dashboard from './components/layout/Dashboard';

const Home = asyncComponent(() => { return import('./components/Home/Main'); });

const Signup = asyncComponent(() => { return import('./components/signup/Signup'); });

const Login = asyncComponent(() => { return import('./components/login/Login'); });

const Activation = asyncComponent(() => { return import('./components/signup/Activation'); });

const Basic = asyncComponent(() => { return import('./components/profile/Basic'); });

const Additional = asyncComponent(() => { return import('./components/profile/Additional'); });

const ChangePassword = asyncComponent(() => { return import('./components/profile/ChangePassword'); });

const ImageGallery = asyncComponent(() => { return import('./components/profile/ImageGallery'); });



if (localStorage.token) {
  const decoded = jwt_decode(localStorage.token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  
  
  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <AppRoutes exact path="/" layout={Layout} component={Home} />
            <AppRoutes exact path="/signup" layout={Blank} component={Signup} />
            <AppRoutes exact path="/verify/:activation_id" layout={Layout} component={Activation} />
            <AppRoutes exact path="/login" layout={Blank} component={Login} />
          <PrivateRoute exact path="/profile" layout={Dashboard} component={Basic} />
          <PrivateRoute exact path="/profile2" layout={Dashboard} component={Additional} />
          <PrivateRoute exact path="/images" layout={Dashboard} component={ImageGallery} />
          <PrivateRoute exact path="/change-password" layout={Dashboard} component={ChangePassword}/>
          </Switch>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
