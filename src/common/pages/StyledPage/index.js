import React, { Component } from 'react';
import styled from 'styled-components';
import { withLayout } from '../../layouts/AppLayout';

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
  render() {
    return (
      <Wrapper>
        <Header>Styled-Component Demo</Header>
        <Text>
          This is paragraph of text.
        </Text>
      </Wrapper>
    );
  }
}

export default withLayout({ nav: true })(StyledPage);
