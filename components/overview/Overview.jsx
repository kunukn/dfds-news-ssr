import cx from 'clsx';

import { formatShortDate } from '~/utils/date';

// TODO: use links instead of buttons

const Overview = ({ items, onItemClick, isDetailsOpen }) => {
  let years = {};

  return (
    <>
      <div className={cx('overview', { 'overview--locked': isDetailsOpen })}>
        {items.map((item, index) => {
          let StartMarkup = () => null;
          let EndMarkup = () => null;

          if (index === 0) {
            StartMarkup = () => (
              <div className="year-mark-start" id="first-news-item"></div>
            );
          }

          if (items.length - 1 === index) {
            EndMarkup = () => (
              <div className="year-mark-end" id="last-news-item"></div>
            );
          }

          let year = getYearFromDate(item.fields.publicationDate);

          let YearMarkup = () => null;

          if (!years[year]) {
            years[year] = true;
            YearMarkup = () => <div className="year-mark" id={year}></div>;
          }

          return (
            <React.Fragment key={item.sys.id}>
              <StartMarkup />
              <EndMarkup />
              <YearMarkup />
              <button
                id={item.sys.id}
                className="button-overview-item"
                onClick={() => onItemClick(item.sys.id)}
              >
                <div className="overview-item">
                  <div className="overview-item__date">
                    {formatShortDate(item.fields.publicationDate)}
                  </div>
                  <div className="overview-item__title">
                    {item.fields.entryTitle}
                  </div>
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <style jsx>{`
        .overview {
          padding: 60px 10px 40px;
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
          border-radius: 2px;

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
          background: white;
        }
        .year-mark,
        .year-mark-start {
          _outline: 1px solid red;
          position: relative;
          top: -60px;
        }
        :global(.button-overview-item) {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default Overview;

let getYearFromDate = date => date.substring(0, 4);
