import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route path={'/:filter?'} component={App} />
      </Fragment>
    </Router>
  </Provider>
);

export default Root;