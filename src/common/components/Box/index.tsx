import styled from 'styled-components';
import {
  space,
  layout,
  flexbox,
  borders,
  typography,
  color,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  TypographyProps,
  ColorProps,
} from 'styled-system';

export interface Props extends SpaceProps, LayoutProps, FlexboxProps, BorderProps, TypographyProps, ColorProps {}

const Box = styled.div<Props>(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  layout,
  flexbox,
  borders,
  typography,
  color,
);

Box.defaultProps = {
  fontFamily: 'normal',
  fontSize: 'body',
};

export default Box;
