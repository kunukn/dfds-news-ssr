const BackgroundImage = props => (
  <>
    <div className={props.isEnabled ? "fixed-background" : "fixed"} />
    <style jsx>{`
      .fixed {
        display: none;
      }
      .fixed-background {
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        /* https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser */
        min-height: 100vh;
        min-height: -webkit-fill-available;
        width: 100%;
        /* https://stackoverflow.com/questions/23208200/how-to-darken-a-background-using-css */
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
          url($backgroundImageUrl) no-repeat center center/cover;
      }
    `}</style>
  </>
);

export default BackgroundImage;
