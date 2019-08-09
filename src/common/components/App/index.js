import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';

const HomePage = Loadable({
  loader: () => import('../../pages/HomePage'),
  loading: () => null,
});
const AboutPage = Loadable({
  loader: () => import('../../pages/AboutPage'),
  loading: () => null,
});
const StyledPage = Loadable({
  loader: () => import('../../pages/StyledPage'),
  loading: () => null,
});

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/about" component={AboutPage} />
    <Route exact path="/styled" component={StyledPage} />
  </Switch>
);

export default App;
