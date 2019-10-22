// https://nextjs.org/docs/#custom-document
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="DFDS news" />
          <meta name="keywords" content="DFDS news" />
          <link rel="canonical" href="https://shipping-news.tech" />
          <link
            rel="preload"
            href="https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Regular.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Bold.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Light.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Italic.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/font.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700&display=swap"
            rel="stylesheet"
          />
        </body>
      </html>
    );
  }
}
