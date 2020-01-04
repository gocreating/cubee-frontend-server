import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

const AppLayout = ({ nav, children }) => (
  <>
    {nav && <Nav />}
    {children}
  </>
);

AppLayout.propTypes = {
  nav: PropTypes.bool,
  children: PropTypes.node,
};

export const withLayout = layoutProps => WrappedComponent => pageProps => (
  <AppLayout {...layoutProps}>
    <WrappedComponent {...pageProps} />
  </AppLayout>
);

export default AppLayout;
