// https://nextjs.org/docs/#custom-document
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { urlMockNews } from '~/constants/urls'

let count = 250
let url =
  process.env.NODE_ENV === 'development'
    ? //? 'https://shipping-news.tech/api/mock-news'
      urlMockNews
    : `${process.env.apiEntriesUrl}?content_type=newsArticle&locale=en&select=sys.id,fields.entryTitle,fields.publicationDate&order=-fields.publicationDate&limit=${count}&skip=0&access_token=${process.env.tokenContentful}`

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang='en'>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.news = {};
              `
            }}
          />
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
            href='/fonts/DFDS-Regular.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='/fonts/DFDS-Bold.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='/fonts/DFDS-Light.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='/fonts/DFDS-Italic.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          {/* <link rel="stylesheet" href="/fonts/font.css" /> */}
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try{
                if(location.href.indexOf('client-fast-content=1') >= 0 ) {
                  console.log('${url}')
                  fetch('${url}')
                  .then(r => r.json())
                  .then(d => window.news.ajax = d)
                  .catch(ex => {
                    console.error('fetch err',ex+'')
                  })
                }
              }catch(ex){console.error(ex+'')}
              `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
          try {
            // https://youtu.be/JjRV-l9jSYE?t=668
            window.onload = function() {
              setTimeout(function() {
                var t = window.performance.timing;
                var tti = t.domInteractive - t.domLoading;
                var dcl = t.domContentLoadedEventStart - t.domLoading;
                var loadComplete = t.domComplete - t.domLoading;
                console.log('tti',tti,'DOMContentLoaded',dcl,'loadComplete',loadComplete);
              }, 0)
            }
          } catch(ex){console.warn(ex+'')}
          `
            }}
          />

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
