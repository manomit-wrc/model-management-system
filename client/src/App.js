import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './hoc/Route/AppRoutes';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <AppRoutes exact path="/" layout={Layout} component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
