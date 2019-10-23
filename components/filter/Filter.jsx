import React from 'react';
import Collapse from '@kunukn/react-collapse';
import cx from 'clsx';

import CloseIcon from '~/public/static/icons/Close.svg';
import NextIcon from '~/public/static/icons/Next.svg';
import PreviousIcon from '~/public/static/icons/Previous.svg';
import useClickOutside from '~/hooks/useClickOutside';

const Filter = ({
  isFilterOpen,
  isFilter1Active,
  isFilter2Active,
  isFilter3Active,
  onFilterClick1,
  onFilterClick2,
  onFilterClick3,
  onClose,
}) => {
  let onOutsideClick = () => {
    isFilterOpen && onClose && onClose();
  };

  const clickRef = React.useRef();
  useClickOutside(clickRef, onOutsideClick);

  return (
    <React.Fragment>
      <div
        ref={clickRef}
        className="filter"
        style={{ display: isFilterOpen ? '' : 'none' }}
      >
        <div className="filter__viewport">
          <div className="filter__content">
            <div>Filter</div>
            <div className="button-group">
              <button
                className={cx('button-filter', {
                  'button-filter--active': isFilter1Active,
                })}
                onClick={onFilterClick1}
              >
                DFDS
              </button>
              <button
                className={cx('button-filter', {
                  'button-filter--active': isFilter2Active,
                })}
                onClick={onFilterClick2}
              >
                2019
              </button>
              <div>Settings</div>
              <button
                className={cx('button-filter', {
                  'button-filter--active': isFilter3Active,
                })}
                onClick={onFilterClick3}
              >
                Roboto Font
              </button>
            </div>
            <button
              aria-label="close filter"
              onClick={onClose}
              className="button-close"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter {
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
          background: rgba(white, .98);
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
          border: none;
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
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
      `}</style>
    </React.Fragment>
  );
};

export default Filter;
