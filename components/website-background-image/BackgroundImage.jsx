const BackgroundImage = props => (
  <>
    <div className={props.isEnabled ? "fixed-background" : "fixed"} />
    <style jsx>{`
      .fixed {
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
      .fixed-background {
        pointer-events: none;
        position: fixed;
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

export default BackgroundImage;
