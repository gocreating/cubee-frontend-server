import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import DndItemTypes from '../../DndItemTypes';

const DndItem = ({
  content, children,
}) => {
  return children;
};

export default DndItem;
