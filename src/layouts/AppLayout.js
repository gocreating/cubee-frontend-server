import React from 'react';
import Nav from './Nav';

const AppLayout = ({ nav, children }) => (
  <>
    {nav && <Nav />}
    {children}
  </>
);

export const withLayout = layoutProps => WrappedComponent => pageProps => (
  <AppLayout {...layoutProps}>
    <WrappedComponent {...pageProps} />
  </AppLayout>
);

export default AppLayout;
