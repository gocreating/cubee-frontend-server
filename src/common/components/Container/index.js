import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: block;
  padding: ${props => props.theme.spacing.unit * props.padSize}px;
`;

Container.propTypes = {
  padSize: PropTypes.number,
};

Container.defaultProps = {
  padSize: 4,
};

export default Container;
