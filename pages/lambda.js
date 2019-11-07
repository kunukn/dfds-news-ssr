import NextHead from 'next/head'

const Lambda = ({ random }) => {
  return (
    <>
      <NextHead>
        <title>Lambda</title>
      </NextHead>
      <div className='lambda'>
        <h1>DFSD News app</h1>
        <div>{random}</div>
      </div>
      <style jsx>{`
        h1 {
          font-family: inherit;
          color: $color-groupBlue;
          text-align: center;
          margin: 0;
          padding: 10px;
        }
      `}</style>
    </>
  )
}

Lambda.getInitialProps = async ({ req, query }) => {
  return {
    random: Math.random()
  }
}

export default Lambda
