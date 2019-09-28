import { createGlobalStyle } from 'styled-components';
import themeGet from '@styled-system/theme-get';

const htmlFontSize = 16;
const pxToRem = (size) => `${size / htmlFontSize}rem`;

const fontSizes = [
  pxToRem(12),
  pxToRem(16),
  pxToRem(20),
  pxToRem(24),
  pxToRem(32),
  pxToRem(40),
];
fontSizes.body = fontSizes[1];

const space = [0, 4, 8, 16, 24, 32, 40, 48];
space.unit = space[2];

export default {
  colors: {
    white: '#ffffff',
    grey: '#d9e2e9',
    black: '#9bb2c0',
    primary: '#6ab2d4',
    secondary: '#abdded',
    highlight: '#f4e5bc',
    red: 'red',
  },
  space,
  fonts: {
    normal: '"Lato", "Noto Sans TC"',
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontSizes,
  radii: [
    0, 3, 6,
  ],

  // below are not styled system
  type: {
    fontFamily: '"Lato", "Noto Sans TC"',
    fontSizeH1: pxToRem(48),
    fontSizeH2: pxToRem(40),
    fontSizeH3: pxToRem(32),
    fontSizeH4: pxToRem(24),
    fontSizeH5: pxToRem(20),
    fontSizeH6: pxToRem(16),
    fontSize: pxToRem(16),
    fontSize_1: pxToRem(12),
  },
  spacing: {
    unit: 8,
    unit1: '8px',
    unit2: '16px',
  },
};


/* ref: <https://alligator.io/css/minimal-css-reset/> */
export const ResetStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato|Noto+Sans+TC&display=swap&subset=chinese-traditional');

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    font-family: ${themeGet('fonts.normal')};
  }
`;
