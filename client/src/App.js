import React, { Fragment, useEffect } from 'react';
import AllAlerts from './components/layout/AllAlerts';
import store from './store';
import { Provider } from 'react-redux';
import Navigation from './components/layout/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { loadUser } from './action-creators/auth';


const App = () => {
  useEffect(() => {
    // store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navigation/>
          <AllAlerts/>
          <Switch>
            <Route exact path="/" component={ Login }/>
            <Route exact path="/register" component={ Register }/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
