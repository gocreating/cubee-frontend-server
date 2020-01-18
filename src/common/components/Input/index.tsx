import styled from 'styled-components';
import themeGet from '@styled-system/theme-get';
import Box, { Props as BoxProps } from '../Box';

interface Props extends BoxProps, Pick<HTMLInputElement, 'type'> {
  autoComplete: string;
}

const Input = styled(Box).attrs({
  as: 'input',
  p: 2,
  borderRadius: 1,
})<Props>`
  outline: none;
  border: 1px solid ${themeGet('colors.black')};

  ::placeholder {
    color: ${themeGet('colors.black')};
    opacity: 0.5;
    user-select: none;
  }
  :focus::placeholder {
    opacity: 0.8;
  }
`;

export default Input;
