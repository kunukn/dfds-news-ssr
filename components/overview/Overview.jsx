import cx from 'clsx'
import Link from 'next/link'
import { useStore } from 'laco-react'

import store from '~/store.js'
import { formatShortDate } from '~/utils/date'

const Overview = ({
  items,
  selectArticleById,
  getAllNews,
  isFirstDetailSSR,
}) => {
  let years = {}
  let toBeAdded = null

  let { overviewFocusEvent } = useStore(store)

  React.useEffect(() => {
    if (overviewFocusEvent) {
      if (ref?.current) {
        let elements = [].slice.call(ref.current.querySelectorAll('a'))

        for (let index = 0; index < elements.length; index++) {
          const element = elements[index]
          if (isInViewport(element)) {
            element.focus()
            break
          }
        }
      }
    }
  }, [overviewFocusEvent])

  let ref = React.useRef()

  return (
    <>
      <div
        ref={ref}
        className={cx('overview', {
          'overview--detail-full-focus': isFirstDetailSSR,
        })}
      >
        {false && items?.length === 0 && (
          <button className='btn-get-all-news' onClick={getAllNews}>
            Load
            <br />
            news
          </button>
        )}
        {items.map((item, index) => {
          let StartMarkup = () => null
          let YearMarkup = () => null

          if (index === 0) {
            StartMarkup = () => (
              <div className='year-mark-first' id='first-news-item'></div>
            )
          }

          if (items.length - 1 === index) {
            if (toBeAdded) {
              let year = toBeAdded + ''
              YearMarkup = () => <div className='year-mark' id={year}></div>
              toBeAdded = null
            }
          }

          let year = getYearFromDate(item.fields.publicationDate)

          if (!years[year]) {
            years[year] = true
            if (toBeAdded) {
              YearMarkup = () => (
                <div className='year-mark' id={`${+year + 1}`}></div>
              )
            }
            toBeAdded = year
          }

          let id = item.sys.id

          return (
            <React.Fragment key={id}>
              <StartMarkup />
              <YearMarkup />
              <Link href={`/id/${id}`} prefetch={false}>
                <a
                  id={id}
                  onTouchStart={noop}
                  className='clickable-overview-item'
                  onClick={event => selectArticleById({ event, id })}
                >
                  <div className='overview-item'>
                    <div className='overview-item__date'>
                      {formatShortDate(item.fields.publicationDate)}
                    </div>
                    <div className='overview-item__title'>
                      {item.fields.entryTitle}
                    </div>
                  </div>
                </a>
              </Link>
            </React.Fragment>
          )
        })}
      </div>

      <style jsx>{`
        .overview {
          z-index: 1;
          padding: $spaceTopOverview 10px 40px;
          position: absolute;
          position: relative;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }

        .overview--detail-full-focus {
          z-index: 0;
          padding-bottom: 0;
        }

        :global(.overview-item) {
          padding: 10px;
          font-size: 14px;
          transition: background-color 300ms;

          @media (min-width: 700px) {
            _display: flex;
            flex-wrap: wrap;
            font-size: 16px;
          }

          &:hover {
            background-color: rgba($color-groupBlue, 0.08);
          }
        }
        :global(.overview-item__date) {
          margin-right: 10px;
          min-width: 96px;
          font-size: 14px;
          font-weight: 300;
          font-family: Roboto;
        }
        :global(.overview-item__title) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: normal;
          text-transform: uppercase;
          _color: $color-groupBlue;
        }
        :global(.clickable-overview-item) {
          -webkit-tap-highlight-color: transparent;
          position: relative;
          font-size: 16px;
          text-align: left;
          display: block;
          width: 100%;
          cursor: pointer;
          margin: 0;
          border: none;
          box-shadown: none;
          padding: 0;
          border-radius: 2px;
          background: rgba(white, 0.95);
          @supports (backdrop-filter: blur(10px)) {
            _background: rgba($color-background, 0.7);
            _backdrop-filter: saturate(180%) blur(4px);
          }

          &::after {
            display: none;
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            width: calc(100% + 8px);
            height: calc(100% + 8px);
            border: 2px solid $color-actionBlue;
            border-radius: 3px;
          }

          &:focus {
            outline: none;
            &::after {
              display: block;
            }
          }
        }

        .year-mark-first {
          position: relative;
          top: -$spaceTopOverview;
        }
        .year-mark {
          position: relative;
          top: -$spaceTopOverview * 2;
        }
        :global(.clickable-overview-item) {
          margin-bottom: 10px;
        }
        .btn-get-all-news {
          padding: 10px;
          font-size: 16px;
          background: rgba(white, 0.5);
          border: none;
          @include elevation-1;
        }
      `}</style>
    </>
  )
}

export default React.memo(Overview)

let getYearFromDate = date => date.substring(0, 4)

const noop = () => {
  // This onTouchStart is a workaround to trigger the active state on IOS
}

let isInViewport = elem => {
  if (!elem) return false

  let distance = elem.getBoundingClientRect()
  return distance.top >= 60
}
