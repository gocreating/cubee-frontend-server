import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Divider = styled.div`
  display: block;
  ${props => !props.vertical ? css`
    margin: ${props.theme.spacing.unit * props.size}px 0px;
  ` : css`
    margin: 0px ${props.theme.spacing.unit * props.size}px;
  `}
  ${props => (!props.vertical && !props.hidden) ? css`
    border-top: 2px solid ${props.theme.colors.grey};
  ` : css`
    border-left: 2px solid ${props.theme.colors.grey};
  `}
`;

Divider.propTypes = {
  size: PropTypes.number,
  vertical: PropTypes.bool,
  hidden: PropTypes.bool,
};

Divider.defaultProps = {
  size: 1,
  vertical: false,
  hidden: false,
};

export default Divider;
