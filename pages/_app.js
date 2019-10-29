import React from "react";
import App from "next/app";
import throttle from "lodash.throttle";
import { useStore } from "laco-react";

import store from "~/store.js";
import GlobalStyles from "../components/GlobalStyles";

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

export const dispatchResize = () => {
  store.set(state => ({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  }));
};

const GlobalEffects = () => {

  let onResize = throttle(() => {
    dispatchResize();
  }, 1);

  React.useEffect(() => {
    setTimeout(dispatchResize, 30);
    window.addEventListener("resize", onResize);

    if ("serviceWorker" in navigator) {
      // navigator.serviceWorker
      //   .register('/service-worker.js')
      //   .then(registration => {
      //     console.log('SW success', registration);
      //   })
      //   .catch(err => {
      //     console.warn('SW error', err.message);
      //   });
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
};

export default MyApp;
