import cx from 'clsx'
import { useStore } from 'laco-react'

import ButtonClose from '~/components/button-close/ButtonClose'

import store from '~/store.js'
import DFDSLogo from '~/public/icons/DFDSLogo.svg'
import BurgerMenu from '~/public/icons/BurgerMenu.svg'

const Header = ({
  count,
  setIsFilterOpen,
  isFirstDetailSSR,
  onDetailsClose,
  onMenuToggle,
  isFilter1Active,
  isFilter2Active,
  isFilter3Active
}) => {
  return (
    <>
      <div className={cx('header')}>
        <div className='header__viewport'>
          <div className='header__content'>
            <h1 className='header__title'>
              <div className='filter-info'>
                {isFilter1Active && (
                  <div className='filter-item filter-item--1'></div>
                )}
                {isFilter2Active && (
                  <div className='filter-item filter-item--2'></div>
                )}
                {isFilter3Active && (
                  <div className='filter-item filter-item--3'></div>
                )}
              </div>
              <button
                aria-label='filter button'
                className='button-burger'
                onClick={onMenuToggle}
              >
                <BurgerMenu />
              </button>
              <DFDSLogo /> <span className='header__title-news'>News </span>
              <span className='header__title-count'>
                {count > 0 ? `(${count})` : ''}
              </span>
            </h1>
            {count === 0 && isFirstDetailSSR && (
              <div className='header__detail-focus-mode'>
                <div>Focus </div>
                <div className='header__detail-focus-mode-word'>Mode </div>
                <ButtonClose onClick={onDetailsClose} />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          z-index: 1;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;

          &__title-news {
            height: 30px;
            line-height: 30px;
            position: relative;
            top: 0px;
          }
          &__title-count {
            font-weight: 300;
            height: 30px;
            line-height: 30px;
          }
          &__title {
            margin: 0;
            color: $color-groupBlue;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            font-size: 20px;
            text-transform: uppercase;

            > :global(svg) {
              margin-right: 10px;
              font-size: 16px;
            }
            :global(span) {
              margin-right: 10px;
              display: inline-block;
            }
          }
        }

        .filter-info {
          position: absolute;
          bottom: 4px;
          left: 90px;
          width: 110px;
          height: 16px;
          _background: rgba(red, 0.1);
          display: flex;
          align-items: flex-end;
        }
        .filter-item {
          border-radius: 0;
          width: 10px;
          height: 10px;
          margin-right: 5px;
          &--1 {
            background: rgba(#1b5786, 0.3);
          }
          &--2 {
            background: rgba(#cc6600, 0.3);
          }
          &--3 {
            background: rgba(#5aa63b, 0.3);
          }
        }

        .header__detail-focus-mode {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }

        .header__detail-focus-mode-word {
          display: none;
          @media (min-width: 500px) {
            display: block;
            margin-left: 5px;
          }
        }

        .header__viewport {
          @include device-width;
          pointer-events: none;
          @include elevation-2;
        }
        .header__content {
          pointer-events: all;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 10px;
          background: rgba($color-background, 0.95);
          @supports (backdrop-filter: blur(10px)) {
            background: rgba($color-background, 0.9);
            backdrop-filter: saturate(180%) blur(4px);
          }
        }
        .button-burger {
          cursor: pointer;
          padding: 0;
          border: none;
          width: 40px;
          height: 40px;
          background: transparent;
          pointer-events: all;
          font-size: 20px;
          line-height: 1;
        }
      `}</style>
    </>
  )
}

export default Header
