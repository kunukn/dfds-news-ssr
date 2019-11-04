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
        <div className="image-background"></div>
      </div>
      <style jsx>{`
        .fixed {
          display: none;
        }
        .fixed-background {
          user-select: none;
          pointer-events: none;
          color: transparent;
          _z-index: 1;
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))
        }
        .image-background {
          position: absolute;
          top: 0;
          left: 0;
          /* https://stackoverflow.com/questions/23208200/how-to-darken-a-background-using-css */
          background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
            url($backgroundImageUrl) no-repeat 50% 50% / contain;

          width: 1024px;
          width: 100%;
          height: 683px;
          height: 100%;
          _opacity: 0.5;
        }
      `}</style>
    </>
  );
};

export default BackgroundImage;
