import styled from 'styled-components';
import { variant } from 'styled-system';
import themeGet from '@styled-system/theme-get';
import Box, { Props as BoxProps } from '../Box';

interface Props extends BoxProps, Pick<HTMLButtonElement, 'type' | 'disabled'> {
  variant: 'primary' | 'secondary';
}

const StyledButton = styled(Box).attrs({
  as: 'button',
  px: 3,
  py: 2,
  borderRadius: 1,
})<Props>`
  outline: none;
  border: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    filter: brightness(105%);
  }
  &:active {
    filter: brightness(95%);
  }

  ${variant({
    variants: {
      primary: {
        color: 'white',
        bg: 'primary',
      },
      secondary: {
        color: 'white',
        bg: 'secondary',
      },
    },
  })}
`;

StyledButton.defaultProps = {
  color: 'black',
  bg: 'grey',
};

export const ButtonGroup = styled(Box)`
  ${StyledButton}:not(:last-child) {
    margin-right: ${themeGet('space.2')}px;
  }
`;

export default StyledButton;
