const server = require('mock-json-server')

const news = require('../data-layer/news')
const news10 = require('../data-layer/news-10')
const article1 = require('../data-layer/article-1')
const article2 = require('../data-layer/article-2')

const app = server(
  {
    '/mock-news': { get: news },
    '/mock-news-10': { get: news10 },
    '/mock-article-1': { get: article1 },
    '/mock-article-2': { get: article2 },
  },
  8000
) // Start the server with a JSON object;

// Start the server;
app.start()

// Reload the server with new data;
// app.reload({ test: true })

// Stop the server
//app.stop();
