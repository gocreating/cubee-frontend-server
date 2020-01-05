import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../Box';

export const H1 = styled(Box).attrs({ as: 'h1' })``;
export const H2 = styled(Box).attrs({ as: 'h2' })``;
export const H3 = styled(Box).attrs({ as: 'h3' })``;
export const H4 = styled(Box).attrs({ as: 'h4' })``;
export const H5 = styled(Box).attrs({ as: 'h5' })``;
export const H6 = styled(Box).attrs({ as: 'h6' })``;

H1.defaultProps = { fontSize: 5, mt: 6 };
H2.defaultProps = { fontSize: 4, mt: 5 };
H3.defaultProps = { fontSize: 3, mt: 4 };
H4.defaultProps = { fontSize: 2, mt: 3 };
H5.defaultProps = { fontSize: 1, mt: 2 };
H6.defaultProps = { fontSize: 0, mt: 1 };

const headingMap = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5,
  6: H6,
};

const Heading = ({ level, ...rest }) => {
  const StyledHeading = headingMap[level];

  return (
    <StyledHeading {...rest} />
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

export default Heading;
