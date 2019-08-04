import React, { Component } from 'react';
import { withLayout } from '../../layouts/AppLayout';

class HomePage extends Component {
  render() {
    return (
      <div>
        Welcome to Cubee!
      </div>
    );
  }
}

export default withLayout({ nav: true })(HomePage);
