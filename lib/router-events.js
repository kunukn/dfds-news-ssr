import mitt from 'mitt'
import Router from 'next/router'

const RouterEvents = mitt()

Router.onRouteChangeStart = (...args) => {
  RouterEvents.emit('routeChangeStart', ...args)
}

Router.onRouteChangeComplete = (...args) => {
  RouterEvents.emit('routeChangeComplete', ...args)
}

Router.onRouteChangeError = (...args) => {
  RouterEvents.emit('routeChangeError', ...args)
}

Router.onHashChangeStart = (...args) => {
  RouterEvents.emit('hashChangeStart', ...args)
}

Router.onHashChangeComplete = (...args) => {
  RouterEvents.emit('hashChangeComplete', ...args)
}

export default RouterEvents
