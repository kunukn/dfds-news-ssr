import { useStore } from 'laco-react'
import Link from 'next/link'

import store from '~/store.js'
import DFDSLogo from '~/public/icons/DFDSLogo.svg'
import CloseIcon from '~/public/icons/Close.svg'
import NextIcon from '~/public/icons/Next.svg'
import PreviousIcon from '~/public/icons/Previous.svg'

const Footer = ({ isFirstDetailSSR }) => {
  let { footerFocusEvent } = useStore(store)

  React.useEffect(() => {
    if (footerFocusEvent) {
      if (ref?.current) {
        let element = ref.current.querySelector('a')
        element && element.focus()
      }
    }
  }, [footerFocusEvent])

  let ref = React.useRef()
  let years = React.useMemo(
    () => range(2011, new Date().getFullYear()).reverse(),
    []
  )

  if (isFirstDetailSSR) return null

  return (
    <>
      <div className='footer' ref={ref}>
        <div className='footer__content'>
          <div className='year-group'>
            <Link href='#first-news-item' prefetch={false}>
              <a>First</a>
            </Link>
            {years.map(year => {
              return (
                <Link key={year} href={`#${year}`} prefetch={false}>
                  <a>’{getDisplayYear(year)}</a>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          z-index: 2;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40px;
          pointer-events: none;
        }

        .footer__content {
          height: inherit;
          @include device-width;
          background: rgba($color-background, 0.95);
          @supports (backdrop-filter: blur(10px)) {
            background: rgba($color-background, 0.9);
            backdrop-filter: saturate(180%) blur(6px);
          }
          box-shadow: 0 0 10px darkgray;
          @include elevation-1;
          pointer-events: all;
          font-size: 16px;
          display: flex;
          align-items: center;
          pointer-events: none;
          padding: 0;
        }
        .year-group {
          display: flex;
          align-items: center;
          pointer-events: all;
          overflow-x: auto;
          overscroll-behavior: contain;
          height: inherit;
          padding: 5px 10px;

          :global(a) {
            min-width: 42px;
            font-size: 14px;
            margin-right: 10px;
            text-decoration: none;
            color: $color-groupBlue;
            padding: 0px 10px;
            background: white;
            align-self: stretch;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

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
        }
      `}</style>
    </>
  )
}

export default Footer

function range(start, end) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start)
}

function getDisplayYear(year) {
  try {
    return (year + '').substring(2)
  } catch (ex) {
    return '?'
  }
}
