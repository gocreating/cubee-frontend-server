import React, { Component } from 'react';
import { withLayout } from '../../layouts/AppLayout';

class AboutPage extends Component {
  render() {
    return (
      <div>
        About Cubee
      </div>
    );
  }
}

export default withLayout({ nav: true })(AboutPage);
