// server.js
const path = require('path')
const pause = require('connect-pause');

const news = require('../data-layer/news')
const news10 = require('../data-layer/news-10')
const article1 = require('../data-layer/article-1')
const article2 = require('../data-layer/article-2')

const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router({
  'mock-news': news,
  'mock-news-10': news10,
  'mock-article-1': article1,
  'mock-article-2': article2,
})
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(pause(3000));
server.use('/api', router)
server.use(router)
server.listen(8008, () => {
  console.log('JSON Server is running')
})
