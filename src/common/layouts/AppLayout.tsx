import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Messages from './Messages';

interface Props {
  nav?: boolean;
  children?: React.ReactNode;
}

const AppLayout: React.FunctionComponent<Props> = ({ nav, children }) => (
  <>
    <Messages />
    {nav && <Nav />}
    {children}
  </>
);

AppLayout.propTypes = {
  nav: PropTypes.bool,
  children: PropTypes.node,
};

AppLayout.defaultProps = {
  nav: false,
  children: null,
};

export const withLayout = <BaseProps extends {}>(layoutProps: Props) => (BaseComponent: React.ComponentType<BaseProps>) => (pageProps: BaseProps) => (
  <AppLayout {...layoutProps}>
    <BaseComponent {...pageProps} />
  </AppLayout>
);

export default AppLayout;
