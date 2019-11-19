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
    render: +this.props.router?.query?.['slow-simulation'] ? false : true
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
    windowWidth: window.innerWidth
  }))
}

export const dispatchDetailsFocus = () => {
  store.set(state => ({
    detailsFocusEvent: Date.now()
  }))
}
export const dispatchOverviewFocus = () => {
  store.set(state => ({
    overviewFocusEvent: Date.now()
  }))
}
export const dispatchFooterFocus = () => {
  store.set(state => ({
    footerFocusEvent: Date.now()
  }))
}
export const dispatchHeaderFocus = () => {
  store.set(state => ({
    headerFocusEvent: Date.now()
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

  let onKeyEvent = event => {
    if (event.ctrlKey && event.code === 'ArrowRight') {
      dispatchDetailsFocus()
    }
    if (event.ctrlKey && event.code === 'ArrowLeft') {
      dispatchOverviewFocus()
    }
    if (event.ctrlKey && event.code === 'ArrowDown') {
      dispatchFooterFocus()
    }
    if (event.ctrlKey && event.code === 'ArrowUp') {
      dispatchHeaderFocus()
    }
  }

  React.useEffect(() => {
    setTimeout(dispatchResize, 30)
    window.addEventListener('resize', onResize)
    document.addEventListener('keyup', onKeyEvent)

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
      document.removeEventListener('keyup', onKeyEvent)
    }
  }, [])

  return null
}

export default withRouter(MyApp)
