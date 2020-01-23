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
const LoginPage = Loadable({
  loader: () => import('../../pages/LoginPage'),
  loading: () => null,
});
const NoMatchPage = Loadable({
  loader: () => import('../../pages/NoMatchPage'),
  loading: () => null,
});

const App: React.FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <>
      <Helmet>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
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
        <Route exact path="/login" component={LoginPage} />
        <Route path="*" component={NoMatchPage} />
      </Switch>
    </>
  </ThemeProvider>
);

export default App;
