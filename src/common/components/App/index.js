import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import theme, { ResetStyle, GlobalStyle } from '../../theme';
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
const ComponentDemoPage = Loadable({
  loader: () => import('../../pages/ComponentDemoPage'),
  loading: () => null,
});

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <Helmet>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Cubee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Helmet>
      <ResetStyle />
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/styled" component={StyledPage} />
        <Route exact path="/components" component={ComponentDemoPage} />
      </Switch>
    </>
  </ThemeProvider>
);

export default App;
