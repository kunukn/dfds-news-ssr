import data from '~/data-layer/news-10'

export default (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // )
  return res.json(data)
}
