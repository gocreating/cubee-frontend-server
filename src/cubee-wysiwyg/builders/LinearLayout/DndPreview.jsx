import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div`
  z-index: 999;
  ${props => props.orientation === 'horizontal' ? css`
    display: flex;
    align-items: stretch;
  ` : css`
    width: 100%;
    height: 0px;
  `}
`;

const PreviewBox = styled.div`
  outline: 2px solid rgb(152, 213, 236);
`;

const DndPreview = ({ visible, orientation }) => {
  if (!visible) {
    return null;
  }
  return (
    <Container orientation={orientation}>
      <PreviewBox />
    </Container>
  )
};

DndPreview.propTypes = {
  visible: PropTypes.bool.isRequired,
  orientation: PropTypes.string.isRequired,
};

export default DndPreview;
