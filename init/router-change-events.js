import Router from 'next/router'
import RouterEvents from '~/lib/router-events'

import store from '~/store.js'
import pageType from '~/utils/pageType'

RouterEvents.on('routeChangeStart', url => {})

RouterEvents.on('routeChangeComplete', url => {
  if (Router.query.id) {
    store.set(state => ({ pageMode: pageType.detail }))
  } else {
    store.set(state => ({ pageMode: pageType.overview }))
  }
})

RouterEvents.on('routeChangeError', url => {})

RouterEvents.on('hashChangeStart', url => {})

RouterEvents.on('hashChangeComplete', url => {})
