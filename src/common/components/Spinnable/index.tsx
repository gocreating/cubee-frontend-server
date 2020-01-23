/**
 * Inspired by https://codepen.io/teerapuch/pen/vLJXeR
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const spin = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  animation-name: ${spin};
  animation-duration: 3000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Spinnable: React.FunctionComponent<Props> = ({ children }) => (
  <Spinner>
    {children}
  </Spinner>
);

Spinnable.propTypes = {
  children: PropTypes.node,
};

export default Spinnable;
