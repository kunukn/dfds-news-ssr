import React from 'react'

let GlobalStyles = () => (
  <style jsx global>{`
    @font-face {
      font-display: swap;
      font-family: DFDS;
      src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Regular.woff2')
          format('woff2'),
        url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Regular.woff')
          format('woff');
      font-weight: normal;
    }
    @font-face {
      font-display: swap;
      font-family: DFDS;
      src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Bold.woff2')
          format('woff2'),
        url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Bold.woff')
          format('woff');
      font-weight: bold;
    }
    @font-face {
      font-display: swap;
      font-family: DFDS;
      src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Light.woff2')
          format('woff2'),
        url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Light.woff')
          format('woff');
      font-weight: 300;
    }
    @font-face {
      font-display: swap;
      font-family: DFDS;
      src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Italic.woff2')
          format('woff2'),
        url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Italic.woff')
          format('woff');
      font-style: italic;
    }

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
      color: $color-textGrey;
      background-color: $color-background;
      position: relative;
      min-height: 100vh;
      min-height: -webkit-fill-available;
      overscroll-behavior: contain;
    }
    button {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-family: inherit;
      cursor: pointer;
      border-radius: 2px;
    }

    #__next {
      @include device-width;
      min-height: 100vh;
    }

    a {
      text-decoration: none;
      color: #1b5786;
      border-radius: 2px;
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

    .u-flex-center {
      display: flex;
      align-items: center;
    }
  `}</style>
)

export default GlobalStyles
