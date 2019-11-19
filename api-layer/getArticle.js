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

      let server = mockServer || ''

      if (id === '2AmKcLjdC3igMkH1ZRl98j') {
        url = `${server}/api/mock-article-1`
      } else if (id === '18rghKiRarsmtklwZ8JbQn') {
        url = `${server}/api/mock-article-2`
      } else {
        url = `${server}/api/mock-article-3`
      }
    }

    const response = await fetch(url, options)

    let json = await response.json()

    return Promise.resolve(json)
  } catch (ex) {
    console.error(ex.toString())
    return Promise.resolve(null)
  }
}
