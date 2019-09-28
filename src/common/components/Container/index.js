import styled from 'styled-components';
import { space } from 'styled-system';
import themeGet from '@styled-system/theme-get';
import Box from '../Box';

const Container = styled(Box)`
  display: block;
  padding: ${themeGet('space.5')}px;
  ${space}
`;

export default Container;
