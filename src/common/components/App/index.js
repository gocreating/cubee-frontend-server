import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';
import './App.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #eee;
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
