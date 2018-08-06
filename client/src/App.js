import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './components/hoc/AppRoutes';
import PrivateRoute from './components/hoc/PrivateRoute';
import Layout from './components/layout/Layout';
import Blank from './components/layout/Blank';
import Dashboard from './components/layout/Dashboard';
import Home from './components/Home/Main';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Activation from './components/signup/Activation';
import Basic from './components/profile/Basic';
import RequireAuth from './components/utils/RequireAuth';

import { setCurrentUser, logoutUser } from './actions/auth';
import { clearCurrentProfile } from './actions/profile';
import jwt_decode from 'jwt-decode';


if (localStorage.token) {
  
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
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
            <PrivateRoute
              exact
              path="/profile"
              layout={Dashboard} 
              component={Basic}
          />
          </Switch>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
