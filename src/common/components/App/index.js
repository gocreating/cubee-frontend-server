import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import './App.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #eee;
  }
`;

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
  <>
    <Helmet>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Cubee</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    </Helmet>
    <GlobalStyle />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/styled" component={StyledPage} />
    </Switch>
  </>
);

export default App;
