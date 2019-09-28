import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import themeGet from '@styled-system/theme-get';
import Box from '../Box';

const Divider = styled(Box)`
  display: block;
  clear: both;

  ${props => !props.hidden && ((props.variant !== 'vertical') ? css`
    border-top: 2px solid ${themeGet('colors.grey')};
  ` : css`
    border-left: 2px solid ${themeGet('colors.grey')};
  `)}

  ${variant({
    variants: {
      horizontal: {
        my: 2,
      },
      vertical: {
        mx: 2,
      },
    },
  })}
`;

Divider.propTypes = {
  hidden: PropTypes.bool,
};

Divider.defaultProps = {
  variant: 'horizontal',
  hidden: false,
};

export default Divider;
