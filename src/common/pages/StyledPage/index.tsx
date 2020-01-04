import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { withLayout } from '../../layouts/AppLayout';
import Container from '../../components/Container';
import {
  clearAuth,
  selectors as authSelectors,
} from '../../ducks/auth';
import { getStatus } from '../../ducks/status';

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

class StyledPage extends Component {
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

StyledPage.propTypes = {
  users: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  clearAuth: PropTypes.func.isRequired,
  getStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: authSelectors.getUsers(state),
  status: state.status,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearAuth,
  getStatus,
}, dispatch);

export default withLayout({ nav: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    StyledPage,
  ),
);
