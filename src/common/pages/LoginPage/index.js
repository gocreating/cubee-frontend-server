import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  loginRequest,
  selectors as authSelectors,
} from '../../ducks/auth';

class LoginPage extends Component {
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  handleBtnLoginClick = () => {
    const { loginRequest } = this.props;
    loginRequest(this.usernameRef.current.value, this.passwordRef.current.value);
  }

  render() {
    const { isLoggingIn } = this.props;

    return (
      <Container>
        <Helmet>
          <title>Login to Cubee</title>
        </Helmet>
        <Heading level={2}>Login to Cubee</Heading>
        <Form>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <Input
              ref={this.usernameRef}
              id="username"
              type="text"
              autoComplete="new-password"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Input
              ref={this.passwordRef}
              id="password"
              type="password"
              autoComplete="new-password"
            />
          </Form.Field>
          <Button
            type="button"
            variant="primary"
            disabled={isLoggingIn}
            onClick={this.handleBtnLoginClick}
          >
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggingIn: authSelectors.getIsLoggingIn(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginRequest,
}, dispatch);

export default withLayout({ nav: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    LoginPage,
  ),
);
