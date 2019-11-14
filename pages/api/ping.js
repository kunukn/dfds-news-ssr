const data = 'pong'

export default (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // )
  return res.json(data)
}
