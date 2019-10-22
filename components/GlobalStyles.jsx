import React from 'react';

let GlobalStyles = () => (
  <style jsx global>{`
    *,
    ::before,
    ::after {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: DFDS, Verdana, sans-serif;
      margin: 0;
      color: $color-text;
      background-color: $color-background;
      position: relative;
      min-height: 100vh;
    }
    button {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-family: inherit;
      cursor: pointer;
    }
    #__next {
      @include device-width;
      min-height: 100vh;
    }

    a {
      text-decoration: none;
      color: #1b5786;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    p {
      line-height: 1.5;
    }

    .collapse-css-transition {
      transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  `}</style>
);

export default GlobalStyles;
