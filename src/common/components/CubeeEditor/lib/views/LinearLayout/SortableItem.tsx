import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import Handle from '../../../Handle';
import useView from '../../hooks/useView';
import ItemTypes from '../../../ItemTypes';

const Container = styled.div`
  display: flex;

  ${props => props.translucent && css`
    opacity: 0.2;
  `}
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const SortableItem: React.FunctionComponent = ({
  view,
  // props for drag sorting
  index, isPreviewing, previewIndex, previewAt, swap, add, clearPreview,
  parentViewId, orientation,
  // customizable props
  showPreviewWhenOrderNotChange, cancelWhenDropOutside,
  children,
}) => {
  if (view.type === 'PREVIEW') {
    return children;
  }
  const { viewComponentMap } = useView();
  const ref = useRef(null);
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.INSERTED_VIEW,
      viewType: view.type,
      index,
      parentViewId,
      clearPreview,
    },
    end(dropResult, monitor) {
      /*
       * Once drag start, `dropResult.index` will never update even we call setState
       * So here we need to calculate it manually according to current previewing index
       */
      const dragIndex = dropResult.index < previewIndex ? dropResult.index : dropResult.index + 1;
      const isDropInside = monitor.didDrop();
      if (isPreviewing && (!cancelWhenDropOutside || (cancelWhenDropOutside && isDropInside))) {
        swap(dragIndex, previewIndex);
      }
      clearPreview();
    },
    collect: monitor => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });
  const [, drop] = useDrop({
    accept: Object.keys(ItemTypes),
    drop(item, monitor) {
      if (item.type === ItemTypes.SOURCE_VIEW && isPreviewing) {
        add(previewIndex, item.viewType);
        clearPreview();
      }
    },
    collect(monitor) {
      const item = monitor.getItem();
      if (!monitor.isOver()) {
        clearPreview();
      }
      return {};
    },
    // canDrop(item, monitor) {
    //   console.log('dragParentId', item.parentViewId, 'testParentId', parentViewId);
    //   return item.parentViewId === parentViewId;
    // },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.type === ItemTypes.SOURCE_VIEW) {
        const hoverIndex = index;
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        let newPreviewIndex = previewIndex;
        if (hoverIndex < previewIndex) {
          if (hoverClientY < hoverMiddleY) {
            newPreviewIndex = hoverIndex;
          } else {
            newPreviewIndex = hoverIndex + 1;
          }
        } else {
          if (hoverClientY < hoverMiddleY) {
            newPreviewIndex = hoverIndex - 1;
          } else {
            newPreviewIndex = hoverIndex;
          }
        }
        previewAt(newPreviewIndex);
        return;
      }
      if (item && item.type === ItemTypes.INSERTED_VIEW) {
        // hover back
        if (!monitor.isOver({ shallow: true })) {
          clearPreview();
          return;
        }
        // hover front
        if (monitor.isOver({ shallow: true })) {
          item.clearPreview();
        }
      }
      if (orientation === 'vertical') {
        /*
        * Once drag start, `item.index` will never update even we call setState
        * So here we need to calculate it manually according to current previewing index
        */
        const dragIndex = item.index < previewIndex ? item.index : item.index + 1;
        const hoverIndex = index;
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        let newPreviewIndex = previewIndex;

        if (dragIndex > hoverIndex) {
          if (hoverIndex < previewIndex) {
            if (hoverClientY < hoverMiddleY) {
              newPreviewIndex = hoverIndex;
            } else {
              newPreviewIndex = hoverIndex + 1;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex - 1)) {
                clearPreview();
                return;
              }
            }
          } else {
            if (hoverClientY < hoverMiddleY) {
              newPreviewIndex = hoverIndex - 1;
            } else {
              newPreviewIndex = hoverIndex;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex - 1)) {
                clearPreview();
                return;
              }
            }
          }
        }
        if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && dragIndex === hoverIndex) {
          clearPreview();
          return;
        }
        if (dragIndex === hoverIndex) {
          if (hoverIndex < previewIndex) {
            if (hoverClientY < hoverMiddleY) {
              newPreviewIndex = hoverIndex;
            } else {
              newPreviewIndex = hoverIndex + 1;
            }
          } else {
            if (hoverClientY < hoverMiddleY) {
              newPreviewIndex = hoverIndex - 1;
            } else {
              newPreviewIndex = hoverIndex;
            }
          }
        }
        if (dragIndex < hoverIndex) {
          if (hoverIndex < previewIndex) {
            if (hoverClientY < hoverMiddleY) {
              newPreviewIndex = hoverIndex;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex + 1)) {
                clearPreview();
                return;
              }
            } else {
              newPreviewIndex = hoverIndex + 1;
            }
          } else {
            if (hoverClientY < hoverMiddleY) {
              newPreviewIndex = hoverIndex - 1;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex + 1)) {
                clearPreview();
                return;
              }
            } else {
              newPreviewIndex = hoverIndex;
            }
          }
        }
        if (item.type === ItemTypes.INSERTED_VIEW) {
          previewAt(newPreviewIndex);
          return;
        }
      }

      if (orientation === 'horizontal') {
        /*
        * Once drag start, `item.index` will never update even we call setState
        * So here we need to calculate it manually according to current previewing index
        */
        const dragIndex = item.index < previewIndex ? item.index : item.index + 1;
        const hoverIndex = index;
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        let newPreviewIndex = previewIndex;

        if (dragIndex > hoverIndex) {
          if (hoverIndex < previewIndex) {
            if (hoverClientX < hoverMiddleX) {
              newPreviewIndex = hoverIndex;
            } else {
              newPreviewIndex = hoverIndex + 1;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex - 1)) {
                clearPreview();
                return;
              }
            }
          } else {
            if (hoverClientX < hoverMiddleX) {
              newPreviewIndex = hoverIndex - 1;
            } else {
              newPreviewIndex = hoverIndex;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex - 1)) {
                clearPreview();
                return;
              }
            }
          }
        }
        if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && dragIndex === hoverIndex) {
          clearPreview();
          return;
        }
        if (dragIndex === hoverIndex) {
          if (hoverIndex < previewIndex) {
            if (hoverClientX < hoverMiddleX) {
              newPreviewIndex = hoverIndex;
            } else {
              newPreviewIndex = hoverIndex + 1;
            }
          } else {
            if (hoverClientX < hoverMiddleX) {
              newPreviewIndex = hoverIndex - 1;
            } else {
              newPreviewIndex = hoverIndex;
            }
          }
        }
        if (dragIndex < hoverIndex) {
          if (hoverIndex < previewIndex) {
            if (hoverClientX < hoverMiddleX) {
              newPreviewIndex = hoverIndex;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex + 1)) {
                clearPreview();
                return;
              }
            } else {
              newPreviewIndex = hoverIndex + 1;
            }
          } else {
            if (hoverClientX < hoverMiddleX) {
              newPreviewIndex = hoverIndex - 1;
              if (!showPreviewWhenOrderNotChange && item.parentViewId === parentViewId && (newPreviewIndex === dragIndex || newPreviewIndex === dragIndex + 1)) {
                clearPreview();
                return;
              }
            } else {
              newPreviewIndex = hoverIndex;
            }
          }
        }
        previewAt(newPreviewIndex);
      }
    },
  });
  preview(drop(ref));

  return (
    <Container
      ref={ref}
      translucent={isDragging}
    >
      <Handle ref={drag} />
      <Content>
        {children}
      </Content>
    </Container>
  )
};

SortableItem.propTypes = {
  children: PropTypes.node.isRequired,
  showPreviewWhenOrderNotChange: PropTypes.bool,
  cancelWhenDropOutside: PropTypes.bool,
};

SortableItem.defaultProps = {
  showPreviewWhenOrderNotChange: false,
  cancelWhenDropOutside: false,
};

export default SortableItem;
