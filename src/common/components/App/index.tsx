import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import LoadingPage from '../../pages/LoadingPage';
import theme, { ResetStyle, GlobalStyle } from '../../theme';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DynamicImportType = () => Promise<{ default: React.ComponentType<any> }>;

const createLoadable = (loader: DynamicImportType) => Loadable({
  loader,
  loading: LoadingPage,
  delay: 200,
  timeout: 10000,
});

const HomePage = createLoadable(() => import('../../pages/HomePage'));
const AboutPage = createLoadable(() => import('../../pages/AboutPage'));
const TestPage = createLoadable(() => import('../../pages/TestPage'));
const ComponentDemoPage = createLoadable(() => import('../../pages/ComponentDemoPage'));
const LoginPage = createLoadable(() => import('../../pages/LoginPage'));
const UserPostListPage = createLoadable(() => import('../../pages/user/PostListPage'));
const PostNewPage = createLoadable(() => import('../../pages/user/PostNewPage'));
const NoMatchPage = createLoadable(() => import('../../pages/NoMatchPage'));

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
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/components" component={ComponentDemoPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/loading" component={LoadingPage} />
        <Redirect exact from="/:username" to="/:username/posts" />
        <Route exact path="/:username/posts" component={UserPostListPage} />
        <Route exact path="/posts/new" component={PostNewPage} />
        <Route path="*" component={NoMatchPage} />
      </Switch>
    </>
  </ThemeProvider>
);

export default App;
