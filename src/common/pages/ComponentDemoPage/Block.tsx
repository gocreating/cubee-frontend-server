import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themeGet from '@styled-system/theme-get';
import Container from '../../components/Container';
import { H2 } from '../../components/Heading';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const StyledH2 = styled(H2).attrs({
  color: 'primary',
  pt: 5,
  mt: 0,
  mb: 3,
})`
  border-bottom: 2px solid ${themeGet('colors.grey')};
`;

const Block: React.FunctionComponent<Props> = ({ title, children }) => (
  <Container p={3}>
    <StyledH2>{title}</StyledH2>
    {children}
  </Container>
);

Block.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Block.defaultProps = {
  title: '',
  children: null,
};

export default Block;
