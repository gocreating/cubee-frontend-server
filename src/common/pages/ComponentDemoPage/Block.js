import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../../components/Container';

const StyledContainer = styled(Container)`
  margin-bottom: ${props => props.theme.spacing.unit2};
`;

const Header = styled.h2`
  color: ${props => props.theme.colors.primary};
  border-bottom: 2px solid ${props => props.theme.colors.grey};
  margin-bottom: ${props => props.theme.spacing.unit2};
`;

const Block = ({ title, children }) => (
  <StyledContainer padSize={0}>
    <Header>{title}</Header>
    {children}
  </StyledContainer>
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
