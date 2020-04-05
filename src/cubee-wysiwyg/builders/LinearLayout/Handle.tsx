import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { DragIndicator as DragIndicatorIcon } from '@styled-icons/material/DragIndicator';
import { ConnectDragSource } from 'react-dnd';

const DragIndicator = styled.span`
  height: fit-content;
  cursor: move;
`;

const Handle = forwardRef((props, ref: React.Ref<HTMLElement>) => (
  <DragIndicator
    ref={ref as ConnectDragSource}
    {...props}
  >
    <DragIndicatorIcon size={24} />
  </DragIndicator>
));

export default Handle;
