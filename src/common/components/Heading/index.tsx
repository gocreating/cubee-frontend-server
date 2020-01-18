import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../Box';

enum HeadingLevel {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

interface Props {
  level: HeadingLevel;
}

export const H1: React.FunctionComponent = styled(Box).attrs({
  as: 'h1',
  fontSize: 5,
  mt: 6,
})``;
export const H2: React.FunctionComponent = styled(Box).attrs({
  as: 'h2',
  fontSize: 4,
  mt: 5,
})``;
export const H3: React.FunctionComponent = styled(Box).attrs({
  as: 'h3',
  fontSize: 3,
  mt: 4,
})``;
export const H4: React.FunctionComponent = styled(Box).attrs({
  as: 'h4',
  fontSize: 2,
  mt: 3,
})``;
export const H5: React.FunctionComponent = styled(Box).attrs({
  as: 'h5',
  fontSize: 1,
  mt: 2,
})``;
export const H6: React.FunctionComponent = styled(Box).attrs({
  as: 'h6',
  fontSize: 0,
  mt: 1,
})``;

const headingMap = {
  [HeadingLevel.H1]: H1,
  [HeadingLevel.H2]: H2,
  [HeadingLevel.H3]: H3,
  [HeadingLevel.H4]: H4,
  [HeadingLevel.H5]: H5,
  [HeadingLevel.H6]: H6,
};

const Heading: React.FunctionComponent<Props> = ({ level, ...rest }) => {
  const StyledHeading = headingMap[level];

  return (
    <StyledHeading {...rest} />
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf(Object.keys(headingMap).map(Number)).isRequired,
};

export default Heading;
