import React from 'react';
import { useLocation } from 'react-router';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';
import { H3 } from '../../components/Heading';

const NoMatchPage: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <Container>
      <H3>No match for <code>{location.pathname}</code></H3>
    </Container>
  );
}

export default withLayout({ nav: true })(NoMatchPage);
