// https://nextjs.org/docs/#custom-document
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1'
            key='viewport'
          />
          <meta name='description' content='DFDS news' />
          <meta name='keywords' content='DFDS news' />
          <link
            rel='preload'
            href='https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Regular.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Bold.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Light.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Italic.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
           <link rel="stylesheet" href="https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/font.css" />

          {/* <style jsx global>{`
            @font-face {
              font-display: swap;
              font-family: DFDS;
              src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Regular.woff2')
                  format('woff2'),
                url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Regular.woff')
                  format('woff');
              font-weight: normal;
            }
            @font-face {
              font-display: swap;
              font-family: DFDS;
              src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Bold.woff2')
                  format('woff2'),
                url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Bold.woff')
                  format('woff');
              font-weight: bold;
            }
            @font-face {
              font-display: swap;
              font-family: DFDS;
              src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Light.woff2')
                  format('woff2'),
                url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Light.woff')
                  format('woff');
              font-weight: 300;
            }
            @font-face {
              font-display: swap;
              font-family: DFDS;
              src: url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Italic.woff2')
                  format('woff2'),
                url('https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/DFDS-Italic.woff')
                  format('woff');
              font-style: italic;
            }
          `}</style> */}
        </Head>
        <body>
          <Main />
          <NextScript />

          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700&display=swap'
            rel='stylesheet'
          />
        </body>
      </html>
    )
  }
}
