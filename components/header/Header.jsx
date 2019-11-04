import DFDSLogo from "~/public/static/icons/DFDSLogo.svg";
import CloseIcon from "~/public/static/icons/Close.svg";
import NextIcon from "~/public/static/icons/Next.svg";
import PreviousIcon from "~/public/static/icons/Previous.svg";
import BurgerMenu from "~/public/static/icons/BurgerMenu.svg";

const Header = ({ count, setIsFilterOpen }) => {
  return (
    <>
      <div className="header">
        <div className="header__viewport">
          <div className="header__content">
            <h1 className="header__title">
              <button
                aria-label="filter button"
                className="button-burger"
                onClick={() => setIsFilterOpen(s => !s)}
              >
                <BurgerMenu />
              </button>
              <DFDSLogo /> <span className="header__title-news">News </span>
              <span className="header__title-count">
                {count > 0 ? `(${count})` : ""}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
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

        .header__viewport {
          @include device-width;
          pointer-events: none;
          @include elevation-2;
        }
        .header__content {
          pointer-events: all;
          display: inline-block;
          display: block;
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
          :global(svg) {
          }
        }
      `}</style>
    </>
  );
};

export default Header;
