import styled from 'styled-components';
import themeGet from '@styled-system/theme-get';
import Box from '../Box';

const Input = styled(Box).attrs({
  as: 'input',
  p: 2,
  borderRadius: 1,
})`
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
