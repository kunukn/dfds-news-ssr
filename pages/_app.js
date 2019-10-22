import React from 'react';
import App from 'next/app';
//import { useStore } from 'laco-react';

import GlobalStyles from '../components/GlobalStyles';
//import store from '~/store.js';

if (process.browser) {
}

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //     let pageProps = {}
  //     if (Component.getInitialProps) {
  //         pageProps = await Component.getInitialProps(ctx)
  //     }
  //     return { pageProps }
  // }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStyles />
        <GlobalEffects />
        <Component {...pageProps} />
      </>
    );
  }
}

const GlobalEffects = () => {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker
      //   .register('/service-worker.js')
      //   .then(registration => {
      //     console.log('SW success', registration);
      //   })
      //   .catch(err => {
      //     console.warn('SW error', err.message);
      //   });
    }
  }, []);

  return null;
};

export default MyApp;
