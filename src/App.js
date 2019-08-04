import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/about" component={AboutPage} />
  </Switch>
);

export default App;
