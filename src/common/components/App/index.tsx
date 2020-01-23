import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import LoadingPage from '../../pages/LoadingPage';
import theme, { ResetStyle, GlobalStyle } from '../../theme';
import { selectors as hostSelectors } from '../../ducks/host';
import { RootState } from '../../reducers';
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
const NoMatchPage = createLoadable(() => import('../../pages/NoMatchPage'));

const mapStateToProps = (state: RootState) => ({
  isUserDomain: hostSelectors.getIsUserDomain(state),
});

type Props = ReturnType<typeof mapStateToProps>;

const App: React.FunctionComponent<Props> = ({ isUserDomain }) => (
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
        {isUserDomain && (
          <Route exact path="/posts" component={UserPostListPage} />
        )}
        <Route path="*" component={NoMatchPage} />
      </Switch>
    </>
  </ThemeProvider>
);

App.propTypes = {
  isUserDomain: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
