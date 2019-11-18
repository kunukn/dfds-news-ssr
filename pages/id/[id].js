// List overview
// https://cdn.contentful.com/spaces/mivicpf5zews/environments/master/entries?content_type=newsArticle&locale=en&select=sys.id,fields.entryTitle,fields.publicationDate&order=-fields.publicationDate&limit=10&skip=0&access_token=102b6ce0b5beb8e64d0139b604153c92f7476229ee4d2ed5fa3608f2b72640e4

// Details page
// https://cdn.contentful.com/spaces/mivicpf5zews/environments/master/entries/6IMNKTmUUkPRq7SphXcY0U?access_token=102b6ce0b5beb8e64d0139b604153c92f7476229ee4d2ed5fa3608f2b72640e4

//import cx from "clsx";
import { useStore } from 'laco-react'
import dynamic from 'next/dynamic'
import NextHead from 'next/head'
import Router, { useRouter } from 'next/router'
import { createRef, useEffect, useRef, useState } from 'react'
import getArticle from '~/api-layer/getArticle'
import getNewsList from '~/api-layer/getNewsList'
import Header from '~/components/header/Header'
import Overview from '~/components/overview/Overview'
import BackgroundImage from '~/components/website-background-image/BackgroundImage'
import store from '~/store.js'
//import getQueryParams from '~/utils/getQueryParams';
import { filterItemsByCriteria } from '~/utils/filter'
import pageType from '~/utils/pageType'

const Details = dynamic(() => import('~/components/details/Details'), {
  ssr: true
})
const DetailsForwardedRef = React.forwardRef((props, ref) => (
  <Details {...props} forwardedRef={ref} />
))

const Footer = dynamic(() => import('~/components/footer/Footer'), {
  ssr: false
})
const Filter = dynamic(() => import('~/components/filter/Filter'), {
  ssr: false
})

const defaultDocTitle = 'DFDS NEWS'

let clientFastContentNews = []
if (process.browser) {
  clientFastContentNews = window.news?.ajax?.items || []
}

const Index = ({
  items: itemsProp = [],
  article = null,
  id,
  detailsSSR,
  overviewSSR
}) => {
  let cache = useRef({}).current

  // Update cache from SSR
  if (id && article) {
    cache[id] = article
  }

  let { history } = useStore(store)

  let isFirstDetailSSR = history.length === 0 && detailsSSR

  let initialItems = clientFastContentNews?.length
    ? clientFastContentNews
    : itemsProp

  const router = useRouter()
  const pageMode = router.query.id ? pageType.detail : pageType.overview

  const detailsRef = createRef()
  let [items, setItems] = useState(initialItems)
  let [renderedItems, setRenderedItems] = useState(initialItems)
  let [isDetailsExpanded, setIsDetailsExpanded] = useState(true)
  let [selectedArticle, setSelectedArticle] = useState({ id, article })
  let [isDetailsOpen, setIsDetailsOpen] = useState(!!article)
  let [isBackgroundImageEnabled, setIsBackgroundImageEnabled] = useState(true)
  let [isMenuOpen, setIsMenuOpen] = useState(false)

  let [isFilter1Active, setIsFilter1Active] = useState(false)
  let [isFilter2Active, setIsFilter2Active] = useState(false)
  let [isFilter3Active, setIsFilter3Active] = useState(false)

  let [isCustomFontActive, setIsCustomFontActive] = useState(false)

  let onFilterClick1 = () => {
    setIsFilter1Active(s => !s)
  }
  let onFilterClick2 = () => {
    setIsFilter2Active(s => !s)
  }
  let onFilterClick3 = () => {
    setIsFilter3Active(s => !s)
  }
  let onCustomFontClick = () => {
    setIsCustomFontActive(s => !s)
  }
  let onBackgroundImageToggle = () => {
    setIsBackgroundImageEnabled(s => !s)
  }
  let onMenuToggle = () => setIsMenuOpen(s => !s)

  let getNextFromRenderedItems = id => {
    for (let index = 0; index < renderedItems.length; index++) {
      const item = renderedItems[index]

      if (item.sys.id === id) {
        if (renderedItems.length - 1 > index) return renderedItems[index + 1]
        else return null
      }
    }
    return null
  }

  // Update page mode state by routing
  useEffect(() => {
    switch (pageMode) {
      case pageType.overview:
        setIsDetailsOpen(false)
        break
      case pageType.detail:
        setIsDetailsOpen(true)
        break
      default:
        break
    }
  }, [pageMode, router.query.id])

  let onDetailsClose = event => {
    event?.preventDefault && event.preventDefault()

    setTimeout(() => setSelectedArticle({ id: null, article: null }), 100)

    if (isFirstDetailSSR) {
      getAllNews()
    }

    goToOverviewPage()
  }

  // Scroll to top in details component
  useEffect(() => {
    if (selectedArticle?.article && isDetailsOpen && detailsRef?.current) {
      detailsRef.current.scrollTop = 0
    }
  }, [isDetailsOpen, detailsRef, selectedArticle])

  let getAllNews = async () => {
    if (items?.length > 100) return

    let news = await getNewsList(200)
    setItems((news && news.items) || [])
  }

  useEffect(() => {
    if (overviewSSR) {
      document.title = defaultDocTitle

      getAllNews()
    }
  }, [])

  // Updatey by query strings
  useEffect(() => {
    let query = router.query

    if (query.filter) setIsMenuOpen(true)

    if (query.roboto) setIsCustomFontActive(true)

    if (query.background) setIsBackgroundImageEnabled(true)

    if (+query.item) {
      let index = +query.item
      index && selectArticleById(items[index - 1].sys.id)
    }

    if (+query['client-fast-content']) {
      if (items.length) {
        console.log('client-fast-content: ajax done before render')
      }
      if (!items.length && window.news?.ajax?.items?.length) {
        console.log('client-fast-content: ajax done before 2nd render')
        setItems(window.news.ajax.items)
      } else {
        let handler = {
          set: function(obj, prop, value) {
            if (prop === 'ajax') {
              console.log('client-fast-content: render done before ajax')
              console.log('event: proxy listener for news items')
              if (Array.isArray(value?.items)) setItems(value.items)
              // Todo: delete proxy listener
            }
            obj[prop] = value
            return true
          }
        }

        window.news = new Proxy({}, handler)
      }
    }
  }, [])

  // Updatey selected article by routing
  useEffect(() => {
    let id = router.query.id

    let getSelectedArticleAndUpdate = async () => {
      let result = await getArticle(id)
      cache[id] = result
      setSelectedArticle({id, article: result})
    }

    if (id) {
      // console.log(getNextFromRenderedItems(id)?.sys?.id)

      // Update State
      if (cache[id]) {
        setSelectedArticle({id, article: cache[id]})
      } else {
        getSelectedArticleAndUpdate()
      }
    }
  }, [router.query.id])

  useEffect(() => {
    if (isCustomFontActive) {
      document.body.style.fontFamily = 'Roboto, sans-serif'
    } else {
      document.body.style.fontFamily = ''
    }
  }, [isCustomFontActive])

  // Rendered items
  useEffect(() => {
    let result = filterItemsByCriteria({
      items,
      isFilter1Active,
      isFilter2Active,
      isFilter3Active
    })
    setRenderedItems(result)
  }, [items, isFilter1Active, isFilter2Active, isFilter3Active])

  useEffect(() => {
    if (isDetailsOpen) {
      //document.body.style.overflow = 'hidden';
    } else {
      //document.body.style.overflow = '';
    }
  }, [isDetailsOpen])

  // Update document title
  useEffect(() => {
    if (isDetailsOpen) {
      if (selectedArticle?.article?.fields?.title) {
        document.title = selectedArticle.article.fields.title
      }
    } else {
      document.title = defaultDocTitle
    }
  }, [isDetailsOpen, selectedArticle])

  if (!items) return <div className='news'>Failed loading data, sorry.</div>

  let selectArticleById = async ({ event, id }) => {
    event?.preventDefault && event.preventDefault()

    goToDetailsPage(id)
  }

  let onNextSelect = () => {
    if (selectedArticle?.article?.sys?.id) {
      let next = getNextFromRenderedItems(selectedArticle.article.sys.id)
      if (next?.sys?.id) goToDetailsPage(next.sys.id)
    }
  }

  return (
    <>
      <NextHead>
        <title>{defaultDocTitle}</title>
        <link rel='icon' href='/favicon.ico' />
      </NextHead>
      <BackgroundImage isEnabled={isBackgroundImageEnabled} />
      <Overview
        {...{
          items: renderedItems,
          selectArticleById,
          isDetailsOpen,
          getAllNews,
          isFirstDetailSSR
        }}
      />
      <Header
        {...{
          count: renderedItems.length,
          isFirstDetailSSR,
          onDetailsClose,
          onMenuToggle,
          isFilter1Active,
          isFilter2Active,
          isFilter3Active
        }}
      />

      <DetailsForwardedRef
        {...{
          forwardedRef: detailsRef,
          ref: detailsRef,
          isDetailsOpen,
          onDetailsClose,
          onNextSelect,
          selectedArticle,
          isDetailsExpanded,
          isFirstDetailSSR,
          toggleExpanded: () => setIsDetailsExpanded(s => !s)
        }}
      />

      <Filter
        {...{
          isMenuOpen,
          isFilter1Active,
          isFilter2Active,
          isFilter3Active,
          isCustomFontActive,
          onFilterClick1,
          onFilterClick2,
          onFilterClick3,
          onCustomFontClick,
          isBackgroundImageEnabled,
          onBackgroundImageToggle,
          onClose: () => setIsMenuOpen(false)
        }}
      />

      <Footer
        {...{
          isFirstDetailSSR,
          renderScrollbar: !!renderedItems.length
        }}
      />
    </>
  )
}

Index.getInitialProps = async ({ req, query }) => {
  if (query['no-content'] || query['client-fast-content']) {
    return {}
  }

  if (query['client-content']) {
    return { overviewSSR: true }
  }

  if (query.id) {
    let article = await getArticle(query.id)
    return { id: query.id, article, detailsSSR: true }
  }

  let { items } = await getNewsList(10)
  return { items, overviewSSR: true }
}

export default Index

let goToOverviewPage = () => {
  const href = `/`
  const as = `/`
  Router.push(href, as, { shallow: true })
}

let goToDetailsPage = id => {
  const href = `/?id=${id}`
  const as = `/id/${id}`
  Router.push(href, as, { shallow: true })
}
