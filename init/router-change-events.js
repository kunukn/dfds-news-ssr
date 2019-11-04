import Router from 'next/router'
import RouterEvents from '~/lib/router-events'

import store from '~/store.js'

RouterEvents.on('routeChangeStart', url => {})

RouterEvents.on('routeChangeComplete', url => {
  if (Router.query.id) {
    store.set(state => ({ pageMode: 'details' }))
  } else {
    store.set(state => ({ pageMode: 'overview' }))
  }
})

RouterEvents.on('routeChangeError', url => {})

RouterEvents.on('hashChangeStart', url => {})

RouterEvents.on('hashChangeComplete', url => {})
