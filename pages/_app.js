import React from 'react'
import App from 'next/app'
import Router, { withRouter } from 'next/router'
import throttle from 'lodash.throttle'
//import { useStore } from 'laco-react'

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

  state = {
    render: +this.props.router?.query?.['slow-simulation'] ? false : true,
  }

  componentDidMount() {
    // Simulate slow component
    console.log('slow simulation enabled')
    setTimeout(() => {
      this.setState({ render: true })
    }, 500)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <GlobalStyles />
        <GlobalEffects />
        <Preload />
        {this.state.render && <Component {...pageProps} />}
      </>
    )
  }
}

export const dispatchResize = () => {
  store.set(state => ({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  }))
}

const Preload = () => {
  return (
    <>
      <img src='/images/ship.jpg' alt='' className='preload' />
      <style jsx>{`
        .preload {
          position: absolute;
          visibility: hidden;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
        }
      `}</style>
    </>
  )
}

const GlobalEffects = () => {
  let onResize = throttle(() => {
    dispatchResize()
  }, 1)

  React.useEffect(() => {
    // let nprogressCSS = 'nprogressCSS'
    // if (!document.getElementById(nprogressCSS))
    //   addCSS(
    //     'https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css',
    //     nprogressCSS
    //   )

    // let robotoFontCSS = 'robotoFontCSS'
    // if (!document.getElementById(robotoFontCSS))
    //   addCSS(
    //     'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700&display=swap',
    //     robotoFontCSS
    //   )

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

export default withRouter(MyApp)
