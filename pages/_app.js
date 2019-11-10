import React from 'react'
import App from 'next/app'
import { withRouter } from 'next/router'
import throttle from 'lodash.throttle'

import '~/init/nprogress'
import '~/init/router-change-events'
import store from '~/store.js'
import GlobalStyles from '../components/GlobalStyles'

if (process.browser) {
}

class MyApp extends App {
  state = {
    render: +this.props.router?.query?.['slow-simulation'] ? false : true,
  }

  componentDidMount() {
    if (!this.state.render) {
      console.log('slow simulation enabled')
      setTimeout(() => {
        this.setState({ render: true })
      }, 2000)
    }
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
