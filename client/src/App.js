import React, { Fragment } from 'react';
import AllAlerts from './components/layout/AllAlerts';
import store from './store';
import { Provider } from 'react-redux';
import Navigation from './components/layout/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navigation/>
          <AllAlerts/>
            <Route exact path="/" component={ Login }/>
            <Route exact path="/register" component={ Register }/>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
