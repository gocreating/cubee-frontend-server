import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import './App.css';

/* ref: <https://alligator.io/css/minimal-css-reset/> */
const ResetStyle = createGlobalStyle`
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

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato|Noto+Sans+TC&display=swap&subset=chinese-traditional');

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    font-family: ${props => props.theme.type.fontFamily};
  }
  body {
    background-color: ${props => props.theme.colors.white};
  }
  h1 {
    font-size: ${props => props.theme.type.fontSizeH1};
  }
  h2 {
    font-size: ${props => props.theme.type.fontSizeH2};
  }
  h3 {
    font-size: ${props => props.theme.type.fontSizeH3};
  }
  h4 {
    font-size: ${props => props.theme.type.fontSizeH4};
  }
  h5 {
    font-size: ${props => props.theme.type.fontSizeH5};
  }
  h6 {
    font-size: ${props => props.theme.type.fontSizeH6};
  }
`;

const HomePage = Loadable({
  loader: () => import('../../pages/HomePage'),
  loading: () => null,
});
const AboutPage = Loadable({
  loader: () => import('../../pages/AboutPage'),
  loading: () => null,
});
const StyledPage = Loadable({
  loader: () => import('../../pages/StyledPage'),
  loading: () => null,
});

const htmlFontSize = 16;
const pxToRem = (size) => `${size / htmlFontSize}rem`;
const theme = {
  colors: {
    white: '#ffffff',
    grey: '#d9e2e9',
    black: '#9bb2c0',
    primary: '#6ab2d4',
    secondary: '#abdded',
    highlight: '#f4e5bc',
  },
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

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <Helmet>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Cubee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Helmet>
      <ResetStyle />
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/styled" component={StyledPage} />
      </Switch>
    </>
  </ThemeProvider>
);

export default App;
