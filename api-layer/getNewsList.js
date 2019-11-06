import { sortByDateDescending } from '~/utils/sort';

export default async function getNewsList(count = 10) {
  try {
    const url = `${process.env.apiEntriesUrl}?content_type=newsArticle&locale=en&select=sys.id,fields.entryTitle,fields.publicationDate&order=-fields.publicationDate&limit=${count}&skip=0&access_token=${process.env.tokenContentful}`;

    if (process.env.NODE_ENV === 'development') {
      //console.log(url);

      let data;
      if (count === 10) {
        data = require('~/data-layer/news-10');
      } else {
        data = require('~/data-layer/news');
      }

      let json = data.default || data;

      let items = json && json.total && json.items;

      if (Array.isArray(items)) {
        items = items.sort(sortByDateDescending);
      }

      return Promise.resolve({ items });
    }

    const headers = {
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${process.env.tokenContentful}`,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    let json = await response.json();
    let items = json && json.total && json.items;

    return Promise.resolve({ items });
  } catch (ex) {
    console.error(ex.toString());
    return Promise.resolve({ items: null });
  }
}
