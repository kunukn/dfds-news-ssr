import debounce from 'lodash.debounce'
import NProgress from 'nprogress'
import RouterEvents from '~/lib/router-events'

const start = debounce(NProgress.start, 200)

RouterEvents.on('routeChangeStart', start)
RouterEvents.on('routeChangeComplete', () => {
  start.cancel()
  NProgress.done()
})
RouterEvents.on('routeChangeError', () => {
  start.cancel()
  NProgress.done()
})
