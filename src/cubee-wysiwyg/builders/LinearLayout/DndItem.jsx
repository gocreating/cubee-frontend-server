import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import Handle from './Handle';
import DndItemTypes from '../../DndItemTypes';

const StyledHandle = styled(Handle)`
  display: none;
  position: absolute;
  right: 0px;
  top: 0px;
  margin-right: 100%;
`;

const Container = styled.div`
  display: flex;
  position: relative;

  ${props => props.translucent && css`
    opacity: 0.2;
  `}

  &:hover {
    ${StyledHandle} {
      display: block;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const DndItem = ({
  content, children,
  orientation, previewIndex, index,
  startPreview, stopPreview, indexOfId,
}) => {
  const ref = useRef(null);
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: DndItemTypes.NESTED_SORTABLE,
      dragContent: content,
      dragIndex: index,
    },
    end(dropResult, monitor) {
      stopPreview();
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: [
      DndItemTypes.NESTED_SORTABLE,
      DndItemTypes.INSERTABLE,
    ],
    collect(monitor) {
      if (!monitor.isOver()) {
        stopPreview();
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (item && item.type === DndItemTypes.NESTED_SORTABLE) {
        if (orientation === 'vertical') {
          const hoverIndex = indexOfId(content.id);
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (hoverClientY < hoverMiddleY) {
            startPreview(hoverIndex);
          } else {
            startPreview(hoverIndex + 1);
          }
        }
      }
    },
  });
  preview(drop(ref));

  return (
    <Container
      ref={ref}
      translucent={isDragging}
    >
      <StyledHandle ref={drag} />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

DndItem.propTypes = {
  content: PropTypes.object,
  children: PropTypes.node,
};

export default DndItem;
