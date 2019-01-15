import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import PaymentController from './PaymentController';
import ViewTransactions from './ViewTransactions';
import Settings from './Settings';
import About from './About';
import Help from './Help';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PaymentController} />
        <Route path="/viewTransactions" component={ViewTransactions} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
      </Switch>
    </Router>
  );
};
