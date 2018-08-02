import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppRoutes from './components/hoc/AppRoutes';
import Layout from './components/layout/Layout';
import Blank from './components/layout/Blank';
import Home from './components/Home/Main';
import Signup from './components/signup/Signup';

class App extends Component {
  render() {
    return (
       <Switch>
         <AppRoutes exact path="/" layout={Layout} component={Home} />
         <AppRoutes exact path="/signup" layout={Blank} component={Signup} />
       </Switch>

    );
  }
}

export default App;
