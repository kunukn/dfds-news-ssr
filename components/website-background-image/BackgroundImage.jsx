import { useStore, Subscribe } from "laco-react";

import store, { dispatchResize } from "~/store.js";

const BackgroundImage = props => {
  let { windowHeight, windowWidth } = useStore(store);

  React.useEffect(() => {
    //dispatchResize();
  }, []);

  return (
    <>
      <div
        style={{ height: `${windowHeight ? windowHeight : ""}px` }}
        className={props.isEnabled ? "fixed-background" : "fixed"}
      >
        height: {windowHeight}px
      </div>
      <style jsx>{`
        .fixed {
          display: none;
        }
        .fixed-background {
          user-select: none;
          color: transparent;
          _z-index: 1;
          pointer-events: none;
          position: fixed;
          font-size: 20px;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          /* https://stackoverflow.com/questions/23208200/how-to-darken-a-background-using-css */
          background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
            url($backgroundImageUrl) no-repeat center center/cover;
        }
      `}</style>
    </>
  );
};

export default BackgroundImage;
