import Router from 'next/router'
import RouterEvents from '~/lib/router-events'

import store from '~/store.js'
import pageType from '~/utils/pageType'

RouterEvents.on('routeChangeStart', url => {})

RouterEvents.on('routeChangeComplete', url => {
  store.set(state => {
    state.history.push(url)

    if (state.history.length > 20) {
      // avoid mem leak
      state.history.shift()
    }

    return { routeChanged: true, history: [...state.history] }
  })

  if (Router.query.id) store.set(state => ({ pageMode: pageType.detail }))
  else store.set(state => ({ pageMode: pageType.overview }))
})

RouterEvents.on('routeChangeError', url => {})

RouterEvents.on('hashChangeStart', url => {})

RouterEvents.on('hashChangeComplete', url => {})
