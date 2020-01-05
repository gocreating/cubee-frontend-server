import React, { Component } from 'react';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';

class AboutPage extends Component {
  render() {
    return (
      <Container>
        About Cubee
      </Container>
    );
  }
}

export default withLayout({ nav: true })(AboutPage);
