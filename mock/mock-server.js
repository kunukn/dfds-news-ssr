// server.js
const path = require('path')
const pause = require('connect-pause')
const argv = require('minimist')(process.argv.slice(2))

const news = require('../data-layer/news')
const news10 = require('../data-layer/news-10')
const article1 = require('../data-layer/article-1')
const article2 = require('../data-layer/article-2')
const article3 = require('../data-layer/article-3')

const jsonServer = require('json-server')

console.log('** argv **', argv)

const server = jsonServer.create()

const router = jsonServer.router({
  'mock-news': news,
  'mock-news-10': news10,
  'mock-article-1': article1,
  'mock-article-2': article2,
  'mock-article-3': article3
})
const middlewares = jsonServer.defaults()

let delay = argv.delay ? argv.delay : 0

console.log('** delay **', delay)

server.use(middlewares)
server.use(pause(delay))
server.use('/api', router)
server.use(router)
server.listen(8008, () => {
  console.log('JSON Server is running')
})
