import React from 'react';
import { useDragLayer } from 'react-dnd';
import ItemTypes from '../../ItemTypes';
import ViewSource from '../../ViewSource';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}
function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  let { x, y } = currentOffset
//   if (isSnapToGrid) {
//     x -= initialOffset.x
//     y -= initialOffset.y
//     ;[x, y] = snapToGrid(x, y)
//     x += initialOffset.x
//     y += initialOffset.y
//   }
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}
const CustomDragLayer = props => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))
  function renderItem() {
    switch (itemType) {
      case ItemTypes.SOURCE_VIEW:
        return (
          <ViewSource renderAsDragPreview viewType={item.viewType} />
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset)}
      >
        {renderItem()}
      </div>
    </div>
  )
}
export default CustomDragLayer
