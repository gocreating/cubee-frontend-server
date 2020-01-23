import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';
import {
  clearAuth,
  selectors as authSelectors,
} from '../../ducks/auth';
import { getStatus, selectors as statusSelectors } from '../../ducks/status';
import { RootState, RootAction } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
  users: authSelectors.getUsers(state),
  status: statusSelectors.getState(state),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators<any, any>({
  clearAuth,
  getStatus,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const StyledH3 = styled.h3`
  color: red;
`;

const Text = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 14px;

  &:hover {
    color: blue;
  }
`;

class TestPage extends Component<Props> {
  static propTypes = {
    users: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    clearAuth: PropTypes.func.isRequired,
    getStatus: PropTypes.func.isRequired,
  };

  handleBtnClearClick = () => {
    const { clearAuth } = this.props;
    clearAuth();
  }

  handleBtnGetStatusClick = () => {
    const { getStatus } = this.props;
    getStatus();
  }

  render() {
    const { users, status } = this.props;

    return (
      <Container>
        <Helmet>
          <title>Styled Page</title>
        </Helmet>
        <StyledH3>Styled-Component Demo</StyledH3>
        <Text>
          This is paragraph of text.
        </Text>
        <Text>
          {JSON.stringify(users)}
        </Text>
        <Text>
          {JSON.stringify(status)}
        </Text>
        <button onClick={this.handleBtnClearClick}>Clear Auth</button>
        <button onClick={this.handleBtnGetStatusClick}>Get Status</button>
      </Container>
    );
  }
}

export default withLayout<Props>({ nav: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    TestPage,
  ),
);
