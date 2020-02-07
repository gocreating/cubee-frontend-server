import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { View } from '../../types';

const Container = styled.div`
  ${props => props.orientation === 'horizontal' ? css`
    display: flex;
    align-items: stretch;
  ` : css`
    width: 100%;
    height: 0px;
  `}
  /* padding: 10px; */
`;

const PreviewBox = styled.div`
  /* border: 3px dashed #ccc;
  width: 100%;
  height: 100%;
  min-height: 50px;
  min-width: 50px; */
  outline: 2px solid rgb(152, 213, 236);
`;

const PreviewView: React.FunctionComponent<Props> = ({ view }) => {
  const { props } = view;
  if (!props.visible) {
    return null;
  }
  return (
    <Container orientation={props.orientation}>
      <PreviewBox />
    </Container>
  )
};

PreviewView.propTypes = {
  view: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    props: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

type Props = {
  view: View<{
    visible: boolean;
  }>;
}

export default PreviewView;
