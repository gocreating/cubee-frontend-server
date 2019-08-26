import styled from 'styled-components';

const Input = styled.input`
  padding: ${props => props.theme.spacing.unit1};
  border-radius: 4px;
  font-family: ${props => props.theme.type.fontFamily};
  font-size: ${props => props.theme.type.fontSize};
  border: 1px solid ${props => props.theme.colors.black};

  ::placeholder {
    color: ${props => props.theme.colors.black};
    opacity: 0.5;
    user-select: none;
  }
  :focus::placeholder {
    opacity: 0.8;
  }
`;

export default Input;
