import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
import ViewSourceContentMap from './ViewSourceContentMap';

type Props = {
  viewType: string;
  renderAsDragPreview?: boolean;
  children?: React.ReactNode;
}

const BlockContainer = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  cursor: move;
  position: relative;
  width: fit-content;

  :hover {
    background-color: #eee;
  }

  ${props => props.isDragging ? css`
    border: 1px solid #ccc;
    ::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: #ccc;
      position: absolute;
      left: 0px;
      top: 0px;
    }
  ` : css`
    border: 1px solid #000;
  `}

  ${props => props.isDragPreview && css`
    background-color: #eee;
    transform: rotate(-7deg);
  `}
`;

const ViewSource: React.FunctionComponent<Props> = ({
  viewType, renderAsDragPreview, children,
}) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.SOURCE_VIEW,
      viewType,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <BlockContainer
      ref={drag}
      isDragging={isDragging}
      isDragPreview={renderAsDragPreview}
    >
      {ViewSourceContentMap[viewType]}
    </BlockContainer>
  )
};

ViewSource.propTypes = {
  viewType: PropTypes.string.isRequired,
  renderAsDragPreview: PropTypes.bool,
  children: PropTypes.node,
};

ViewSource.defaultProps = {
  renderAsDragPreview: false,
  children: null,
};

export default ViewSource;
