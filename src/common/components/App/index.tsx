import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import theme, { ResetStyle, GlobalStyle } from '../../theme';
import { selectors as hostSelectors } from '../../ducks/host';
import { RootState } from '../../reducers';
import './App.css';

const HomePage = Loadable({
  loader: () => import('../../pages/HomePage'),
  loading: () => null,
});
const AboutPage = Loadable({
  loader: () => import('../../pages/AboutPage'),
  loading: () => null,
});
const TestPage = Loadable({
  loader: () => import('../../pages/TestPage'),
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
const UserPostListPage = Loadable({
  loader: () => import('../../pages/user/PostListPage'),
  loading: () => null,
});
const NoMatchPage = Loadable({
  loader: () => import('../../pages/NoMatchPage'),
  loading: () => null,
});

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
