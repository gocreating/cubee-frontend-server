import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
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
import { RootState, RootAction } from '../../reducers';

interface Props {
  isLoggingIn: boolean;
  loginRequest: typeof loginRequest;
}

class LoginPage extends Component<Props> {
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    loginRequest: PropTypes.func.isRequired,
  };

  usernameRef = React.createRef<HTMLInputElement>();
  passwordRef = React.createRef<HTMLInputElement>();

  handleBtnLoginClick = () => {
    const { loginRequest } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    loginRequest(this.usernameRef.current!.value, this.passwordRef.current!.value);
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

const mapStateToProps = (state: RootState) => ({
  isLoggingIn: authSelectors.getIsLoggingIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  loginRequest,
}, dispatch);

export default withLayout<Props>({ nav: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    LoginPage,
  ),
);
