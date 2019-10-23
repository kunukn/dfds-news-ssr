import DFDSLogo from '~/public/static/icons/DFDSLogo.svg';
import CloseIcon from '~/public/static/icons/Close.svg';
import NextIcon from '~/public/static/icons/Next.svg';
import PreviousIcon from '~/public/static/icons/Previous.svg';

const Footer = ({ children }) => {
  return (
    <>
      <div className="footer">
        <div className="footer__content">
          <div className="year-group">
            <a href="#first-news-item">First</a>
            <a href="#2019">19´</a>
            <a href="#2018">18´</a>
            <a href="#2017">17´</a>
            <a href="#2016">16´</a>
            <a href="#2015">15´</a>
            <a href="#2014">14´</a>
            <a href="#2013">13´</a>
            <a href="#2012">12´</a>
            <a href="#2011">11´</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
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
          padding: 0;
          background: rgba(white, 0.7);
          @supports (backdrop-filter: blur(10px)) {
            background-color: rgba($color-background, 0.7);
            backdrop-filter: saturate(180%) blur(4px);
          }
          box-shadow: 0 0 10px darkgray;
          @include elevation-1;
          pointer-events: all;
          font-size: 16px;
          display: flex;
          align-items: center;
          pointer-events: none;
          padding: 0 10px;
        }
        .year-group {
          display: flex;
          align-items: center;
          pointer-events: all;
          overflow-x: auto;
          height: inherit;
          padding: 5px 0;

          a {
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
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
