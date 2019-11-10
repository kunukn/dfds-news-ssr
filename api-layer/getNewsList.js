import { sortByDateDescending } from '~/utils/sort'
import { mockServer } from '~/constants/urls'

export default async function getNewsList(count = 10) {
  try {
    let url = `${process.env.apiEntriesUrl}?content_type=newsArticle&locale=en&select=sys.id,fields.entryTitle,fields.publicationDate&order=-fields.publicationDate&limit=${count}&skip=0&access_token=${process.env.tokenContentful}`

    if (process.env.NODE_ENV === 'development') {
      //console.log(url);

      let data
      if (count === 10) {
        url = `${mockServer}/api/mock-news-10`
        //data = require('~/data-layer/news-10');
      } else {
        url = `${mockServer}/api/mock-news`
        //data = require('~/data-layer/news');
      }

      // let json = data.default || data;
      // let items = json && json.total && json.items;
      // if (Array.isArray(items)) {
      //   items = items.sort(sortByDateDescending);
      // }
      //return Promise.resolve({ items });
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: `Bearer ${process.env.tokenContentful}`,
      },
    }

    const response = await fetch(url, options)

    let json = await response.json()
    let items = json && json.total && json.items
    //console.log(items)

    return Promise.resolve({ items })
  } catch (ex) {
    console.error(ex.toString())
    return Promise.resolve({ items: null })
  }
}
