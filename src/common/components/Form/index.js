import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import themeGet from '@styled-system/theme-get';
import Box from '../Box';

const Field = styled(Box)`
  ${props => props.inline ? css`
    display: flex;
  ` : css`
    display: block;
  `}

  label {
    display: inline-block;
    white-space: nowrap;
    padding: ${themeGet('space.2')}px ${themeGet('space.2')}px ${themeGet('space.2')}px 0px;
    color: ${themeGet('colors.black')};

    ${props => !isNaN(props.minLabelWidth) && css`
      min-width: ${themeGet('space.unit')(props) * props.minLabelWidth}px;
      text-align: right;
    `}
    ${props => props.required && css`
      ::before {
        content: '*';
        color: ${themeGet('colors.red')};
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
  minLabelWidth: PropTypes.number,
  required: PropTypes.bool,
};

Field.defaultProps = {
  inline: false,
  minLabelWidth: NaN,
  required: false,
};

const Form = styled(Box).attrs({
  as: 'form',
})`
  ${Field}:first-child {
    padding-top: ${themeGet('space.3')}px;
  }
  ${Field} {
    padding-bottom: ${themeGet('space.3')}px;
  }
`;

const FieldSet = styled(Box).attrs({
  m: 0,
  p: 0,
})`
  border: none;
`;

Form.FieldSet = FieldSet;
Form.Field = Field;

export default Form;
