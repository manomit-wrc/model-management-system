import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppRoutes from './components/hoc/AppRoutes';
import Layout from './components/layout/Layout';
import Blank from './components/layout/Blank';
import Dashboard from './components/layout/Dashboard';
import Home from './components/Home/Main';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Activation from './components/signup/Activation';
import Basic from './components/profile/Basic';
import RequireAuth from './components/utils/RequireAuth';

class App extends Component {
  render() {
    return (
       <Switch>
         <AppRoutes exact path="/" layout={Layout} component={Home} />
         <AppRoutes exact path="/signup" layout={Blank} component={Signup} />
         <AppRoutes exact path="/verify/:activation_id" layout={Layout} component={Activation} />
         <AppRoutes exact path="/login" layout={Blank} component={Login} />
         <AppRoutes exact path="/profile" layout={Dashboard} component={RequireAuth(Basic)} />
       </Switch>

    );
  }
}

export default App;
