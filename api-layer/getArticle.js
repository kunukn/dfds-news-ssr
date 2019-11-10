import fetch from 'isomorphic-unfetch'

import { mockServer } from '~/constants/urls'

export default async function getArticle(id) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: `Bearer ${process.env.tokenContentful}`,
      },
    }

    let url = `${process.env.apiEntriesUrl}/${id}?access_token=${process.env.tokenContentful}`

    if (process.env.NODE_ENV === 'development') {
      //console.log(id, url);

      //let data
      if (id === '18rghKiRarsmtklwZ8JbQn') {
        //data = require('~/data-layer/article-1')
        url = `${mockServer}/api/mock-article-1`
      } else {
        //data = require('~/data-layer/article-2')
        url = `${mockServer}/api/mock-article-2`
      }

      //return Promise.resolve(data.default || data)
    }

    const response = await fetch(url, options)

    let json = await response.json()

    return Promise.resolve(json)
  } catch (ex) {
    console.error(ex.toString())
    return Promise.resolve(null)
  }
}
