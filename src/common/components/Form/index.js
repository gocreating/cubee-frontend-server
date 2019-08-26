import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Field = styled.div`
  ${props => props.inline ? css`
    display: flex;
  ` : css`
    display: block;
  `}

  label {
    display: inline-block;
    white-space: nowrap;
    padding: ${props => `${props.theme.spacing.unit1} ${props.theme.spacing.unit1} ${props.theme.spacing.unit1} 0px`};
    font-family: ${props => props.theme.type.fontFamily};
    font-size: ${props => props.theme.type.fontSize};
    color: ${props => props.theme.colors.black};

    ${props => props.labelMinSize && css`
      min-width: ${props => props.theme.spacing.unit * props.labelMinSize}px;
      text-align: right;
    `}
    ${props => props.required && css`
      ::before {
        content: '*';
        color: red;
        vertical-align: middle;
      }
    `}
  }
  input {
    width: 100%;
  }
`;

Field.propTypes = {
  inline: PropTypes.bool,
  labelMinSize: PropTypes.number,
  required: PropTypes.bool,
};

Field.defaultProps = {
  inline: false,
  labelMinSize: NaN,
  required: false,
};

const Form = styled.form`
  padding: 0px;
  font-family: ${props => props.theme.type.fontFamily};
  font-size: ${props => props.theme.type.fontSize};

  ${Field}:first-child {
    padding-top: ${props => props.theme.spacing.unit1};
  }
  ${Field} {
    padding-bottom: ${props => props.theme.spacing.unit1};
  }
`;

const FieldSet = styled.fieldset`
  padding: 0px;
  margin: 0px;
  border: none;
`;

Form.FieldSet = FieldSet;
Form.Field = Field;

export default Form;
