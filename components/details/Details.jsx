import React from 'react'
import showdown from 'showdown'
import Collapse from '@kunukn/react-collapse'
import cx from 'clsx'
import { Transition } from 'react-transition-group'
//import Router from 'next/router'
import { useStore } from 'laco-react'

import store from '~/store.js'
import { formatLongDate } from '~/utils/date'
import ButtonClose from '~/components/button-close/ButtonClose'
import NextIcon from '~/public/icons/Next.svg'
// import PreviousIcon from '~/public/icons/Previous.svg'
// import UpIcon from '~/public/icons/Up.svg'

let converter = new showdown.Converter()
let sidebarTransitionDuration = 300

// Dummy react-transition-group implementation
//const Transition = ({ children }) => children('dummy-state-value')

const Details = ({
  isDetailsOpen,
  onDetailsClose,
  onNextSelect,
  selectedArticle,
  isDetailsExpanded,
  toggleExpanded,
  isFirstDetailSSR,
  forwardedRef,
}) => {
  let { history } = useStore(store)

  let transitionDisabled = history.length === 1 && history[0] === '/'

  let fields = selectedArticle?.fields

  return (
    <>
      <Transition in={isDetailsOpen} timeout={sidebarTransitionDuration}>
        {state => (
          <div
            className={cx(
              'detail',
              state,
              {
                'detail--full-focus': isFirstDetailSSR,
              },
              { 'detail--is-open': isDetailsOpen },
              { 'detail--is-expanded': isDetailsExpanded }
            )}
            style={{
              transitionDuration: transitionDisabled ? '0s' : '',
            }}
            ref={forwardedRef}
          >
            <div className='detail__content'>
              {fields && (
                <>
                  <time>
                    {fields.location}, {formatLongDate(fields.publicationDate)}
                  </time>
                  <h2 className='detail__title'>{fields.title}</h2>

                  <h3 className='detail__teaser'>{fields.subtitle}</h3>
                  <div className='u-flex-center'>
                    <button className='toggle' onClick={toggleExpanded}>
                      {isDetailsExpanded ? 'Read less' : 'Read more'}
                    </button>
                    <button
                      aria-label='select next'
                      onClick={onNextSelect}
                      className='button-next'
                    >
                      <NextIcon />
                    </button>
                  </div>
                  <Collapse isOpen={isDetailsExpanded}>
                    <div
                      className='detail__content'
                      dangerouslySetInnerHTML={{
                        __html: converter.makeHtml(fields.content),
                      }}
                    ></div>
                  </Collapse>
                  {!isFirstDetailSSR && (
                    <ButtonClose
                      className='detail__button-close-top'
                      onClick={onDetailsClose}
                    />
                  )}

                  <div className='detail__button-close-bottom-wrapper'>
                    <ButtonClose
                      className='detail__button-close-bottom'
                      onClick={onDetailsClose}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Transition>

      <style jsx>{`
        .detail {
          z-index: 1;
          position: fixed;
          top: 5px;
          right: 5px;
          overflow-y: auto;
          max-height: calc(100% - 50px);
          @include elevation-3;
          pointer-events: all;
          padding-bottom: 20px;
          background: rgba(white, 1);
          padding: 10px;
          width: 700px;
          max-width: 80vw;
          @media (min-width: 700px) {
            max-width: 85vw;
          }
          @media (min-width: 1500px) {
            width: 800px;
          }
          @media (min-width: 2100px) {
            right: 5%;
          }

          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-property: transform, opacity;
          transition-duration: ${sidebarTransitionDuration}ms;
          visibility: hidden;
          transform: translateX(100%) scale(0.5);

          &.entering,
          &.entered,
          &.exiting {
            visibility: visible;
          }
          &.exited {
            visibility: hidden;
          }
          &.entering,
          &.entered {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          &.exiting,
          &.exited {
            transform: translateX(100%) scale(0.5);
            opacity: 0.4;
          }
        }
        .detail--is-open {
          transform: translateX(0) scale(1);
          visibility: visible;
          opacity: 1;
        }
        .detail--full-focus {
          z-index: 0;
          right: auto;
          top: 0;
          max-width: 100vw;
          position: absolute;
          position: relative;
          @include device-width;
          box-shadow: none;
          margin-bottom: 10px;
        }
        .detail--is-expanded {
          > .detail__content {
            min-height: 600px;
          }
        }
        .detail__content {
          min-height: 200px;
          :global(p) {
            line-height: 1.5;
          }
        }

        .button-next {
          position: relative;
          display: block;
          padding: 10px;
          background: none;
          border: none;
          box-shadow: none;
          font-size: 16px;
          color: gray;
          > :global(svg) {
            display: block;
          }
        }

        .detail__title {
          padding-right: 10px;
          color: $color-groupBlue;
          margin-top: 10px;
        }
        :global(.detail__button-close-top) {
          position: absolute;
          top: 2px;
          right: 0;
        }
        .detail__button-close-bottom-wrapper {
          position: relative;
          text-align: right;
        }
        :global(.detail__button-close-bottom) {
          margin: -10px;
          margin-left: auto;
        }
        .toggle {
          font-size: 100%;
          padding: 10px 0;
          background: none;
          border: none;
          min-width: 5em;
          text-decoration: underline;
          color: gray;
          text-align: left;
        }
      `}</style>
    </>
  )
}

export default React.forwardRef(Details)
