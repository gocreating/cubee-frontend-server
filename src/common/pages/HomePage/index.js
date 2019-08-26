import React, { Component } from 'react';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';

class HomePage extends Component {
  render() {
    return (
      <Container>
        Welcome to Cubee!
      </Container>
    );
  }
}

export default withLayout({ nav: true })(HomePage);
