import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  outline: none;
  border: none;
  padding: ${props => props.theme.spacing.unit1} ${props => props.theme.spacing.unit2};
  cursor: pointer;
  user-select: none;
  border-radius: 4px;

  font-family: ${props => props.theme.type.fontFamily};
  font-size: ${props => props.theme.type.fontSize};
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.grey};

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    filter: brightness(95%);
  }

  ${props => props.primary && css`
    color: ${props.theme.colors.white};
    background-color: ${props.theme.colors.primary};
  `}

  ${props => props.secondary && css`
    color: ${props.theme.colors.white};
    background-color: ${props.theme.colors.secondary};
  `}
`;

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
  secondary: false,
};

export const ButtonGroup = styled.div`
  ${Button}:not(:last-child) {
    margin-right: ${props => props.theme.spacing.unit1};
  }
`;

export default Button;
