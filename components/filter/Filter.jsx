import React from 'react'
import cx from 'clsx'

import CloseIcon from '~/public/icons/Close.svg'
import useClickOutside from '~/hooks/useClickOutside'

const Filter = ({
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
  onClose
}) => {
  let onOutsideClick = () => {
    isMenuOpen && onClose && onClose()
  }

  const clickRef = React.useRef()
  useClickOutside(clickRef, onOutsideClick)

  return (
    <React.Fragment>
      <div
        ref={clickRef}
        className='filter'
        style={{ display: isMenuOpen ? '' : 'none' }}
      >
        <div className='filter__viewport'>
          <div className='filter__content'>
            <div>Filter</div>

            <div className='button-group'>
              <button
                className={cx('button-filter', {
                  'button-filter--active-1': isFilter1Active
                })}
                onClick={onFilterClick1}
              >
                DFDS
              </button>
              <button
                className={cx('button-filter', {
                  'button-filter--active-2': isFilter2Active
                })}
                onClick={onFilterClick2}
              >
                2019
              </button>
              <button
                className={cx('button-filter', {
                  'button-filter--active-3': isFilter3Active
                })}
                onClick={onFilterClick3}
              >
                New
              </button>
              <div>Settings</div>
              <button
                className={cx('button-filter', {
                  'button-filter--active': isCustomFontActive
                })}
                onClick={onCustomFontClick}
              >
                Roboto Font
              </button>
              <button
                className={cx('button-filter', {
                  'button-filter--active': isBackgroundImageEnabled
                })}
                onClick={onBackgroundImageToggle}
              >
                Background image
              </button>
            </div>

            <button
              aria-label='close filter'
              onClick={onClose}
              className='button-close'
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter {
          z-index: 1;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 300px;
          pointer-events: none;
        }

        .filter__viewport {
          @include device-width;
          pointer-events: none;
        }

        .filter__content {
          pointer-events: all;
          position: relative;
          top: 70px;
          left: 5px;
          overflow-y: auto;
          width: 700px;
          height: 300px;
          max-width: 200px;
          max-height: calc(100% - 40px);
          padding-bottom: 20px;
          @include elevation-8;
          background: rgba(white, 0.98);
          padding: 10px;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .button-filter {
          min-width: 6em;
          font-size: 100%;
          background: none;
          cursor: pointer;
          align-self: stretch;
          padding: 10px;
          box-shadow: none;
          border: 1px solid gray;
          border-radius: 2px;
          font-size: 16px;
          display: inline-block;
          align-self: self-start;
          margin-bottom: 10px;
        }

        .button-close {
          background: transparent;
          color: gray;
          border: none;
          position: absolute;
          top: 0;
          right: 0;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          cursor: pointer;
        }

        .button-filter--active {
          color: white;
          background: #333;
        }
        .button-filter--active-1 {
          background: rgba(#1b5786, 0.3);
        }
        .button-filter--active-2 {
          background: rgba(#cc6600, 0.3);
        }
        .button-filter--active-3 {
          background: rgba(#8c0, 0.3);
        }
      `}</style>
    </React.Fragment>
  )
}

export default Filter
