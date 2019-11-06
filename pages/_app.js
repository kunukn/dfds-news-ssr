import React from 'react'
import App from 'next/app'
import throttle from 'lodash.throttle'
import { useStore } from 'laco-react'

import '~/init/nprogress'
import '~/init/router-change-events'
import store from '~/store.js'
import GlobalStyles from '../components/GlobalStyles'

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
    const { Component, pageProps } = this.props

    return (
      <>
        <GlobalStyles />
        <GlobalEffects />
        <Component {...pageProps} />
      </>
    )
  }
}

export const dispatchResize = () => {
  store.set(state => ({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  }))
}

const GlobalEffects = () => {
  let onResize = throttle(() => {
    dispatchResize()
  }, 1)

  React.useEffect(() => {
    let nprogressCSS = 'nprogressCSS'
    if (!document.getElementById(nprogressCSS))
      addCSS(
        'https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css',
        nprogressCSS
      )

    let robotoFontCSS = 'robotoFontCSS'
    if (!document.getElementById(robotoFontCSS))
      addCSS(
        'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700&display=swap',
        robotoFontCSS
      )

    setTimeout(dispatchResize, 30)
    window.addEventListener('resize', onResize)

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

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}

let addCSS = (url, id) => {
  let head = document.getElementsByTagName('head')[0]
  let link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  link.media = 'all'
  head.appendChild(link)
}

export default MyApp
