import NextHead from 'next/head'

const About = () => {
  return (
    <>
      <NextHead>
        <title>About</title>
      </NextHead>
      <div className='about'>
        <h1>DFSD News app</h1>
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

export default About
