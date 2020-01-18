import { withProperties } from '../../../types/helpers';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import themeGet from '@styled-system/theme-get';
import Box from '../Box';

/**
 * Field
 */
const Field = styled(Box)<FieldProps>`
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

    ${props => !isNaN(props.minLabelWidth as number) && css`
      min-width: ${themeGet('space.unit')(props) * (props.minLabelWidth as number)}px;
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

/**
 * FieldSet
 */
const FieldSet = styled(Box).attrs({
  m: 0,
  p: 0,
})`
  border: none;
`;

/**
 * Form
 */
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

interface FormProps {
  Field: typeof Field;
  FieldSet: typeof FieldSet;
}

interface FieldProps {
  inline?: boolean;
  minLabelWidth?: number;
  required?: boolean;
}

export default withProperties(Form, { Field, FieldSet });
