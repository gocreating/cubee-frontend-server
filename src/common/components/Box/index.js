import styled from 'styled-components';
import {
  space,
  layout,
  flexbox,
  borderRadius,
  typography,
  color,
} from 'styled-system';

const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  layout,
  flexbox,
  borderRadius,
  typography,
  color,
);

Box.defaultProps = {
  fontFamily: 'normal',
  fontSize: 'body',
};

export default Box;
