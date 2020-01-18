import styled from 'styled-components';
import {
  space,
  layout,
  flexbox,
  borderRadius,
  typography,
  color,
} from 'styled-system';

interface Props {
  fontFamily: string;
  fontSize: string;
}

const Box = styled.div<Props>(
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
