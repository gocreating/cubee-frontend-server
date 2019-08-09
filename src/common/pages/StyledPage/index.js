import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withLayout } from '../../layouts/AppLayout';
import {
  clearAuth,
  selectors as authSelectors,
} from '../../ducks/auth';

const Wrapper = styled.div`
  background-color: #777;
`;

const Header = styled.h1`
  margin: 0px;
  padding: 0px;
  font-size: 18px;
  color: red;
`;

const Text = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  color: green;

  &:hover {
    color: blue;
  }
`;

class StyledPage extends Component {
  handleBtnClearClick = () => {
    const { clearAuth } = this.props;
    clearAuth();
  }

  render() {
    const { users } = this.props;

    return (
      <Wrapper>
        <Header>Styled-Component Demo</Header>
        <Text>
          This is paragraph of text.
        </Text>
        <Text>
          {JSON.stringify(users)}
        </Text>
        <button onClick={this.handleBtnClearClick}>Clear Auth</button>
      </Wrapper>
    );
  }
}

StyledPage.propTypes = {
  users: PropTypes.object.isRequired,
  clearAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: authSelectors.getUsers(state.auth),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearAuth,
}, dispatch);

export default withLayout({ nav: true })(
  connect(mapStateToProps, mapDispatchToProps)(
    StyledPage,
  ),
);
