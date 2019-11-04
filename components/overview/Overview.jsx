import cx from "clsx"

import { formatShortDate } from "~/utils/date"
import Link from "next/link"

const noop = () => {
  // This onTouchStart is a workaround to trigger the active state on IOS
}

const Overview = ({ items, selectArticleById, isDetailsOpen, children }) => {
  let years = {}
  let toBeAdded = null

  return (
    <>
      <div className={cx("overview", { "overview--locked": isDetailsOpen })}>
        {children}
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
              let year = toBeAdded + ""
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
                  className='button-overview-item'
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
          padding: $spaceTopOverview 10px 40px;
          position: absolute;
          position: relative;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }

        .overview--locked {
        }

        :global(.overview-item) {
          padding: 10px;
          font-size: 14px;
          _border-radius: 2px;

          @media (min-width: 700px) {
            _display: flex;
            flex-wrap: wrap;
            font-size: 16px;
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
        :global(.button-overview-item) {
          font-size: 16px;
          text-align: left;
          display: block;
          width: 100%;
          cursor: pointer;
          margin: 0;
          border: none;
          box-shadown: none;
          padding: 0;
          _border-radius: 2px;
          background: rgba(white, 0.9);
          @supports (backdrop-filter: blur(10px)) {
            _background: rgba($color-background, 0.7);
            _backdrop-filter: saturate(180%) blur(4px);
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
        :global(.button-overview-item) {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}

export default Overview

let getYearFromDate = date => date.substring(0, 4)
