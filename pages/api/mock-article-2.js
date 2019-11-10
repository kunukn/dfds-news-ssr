const data = {
  sys: {
    space: {
      sys: {
        type: 'Link',
        linkType: 'Space',
        id: 'mivicpf5zews',
      },
    },
    id: '6IMNKTmUUkPRq7SphXcY0U',
    type: 'Entry',
    createdAt: '2019-09-02T10:35:57.712Z',
    updatedAt: '2019-09-02T10:35:57.712Z',
    environment: {
      sys: {
        id: 'master',
        type: 'Link',
        linkType: 'Environment',
      },
    },
    revision: 1,
    contentType: {
      sys: {
        type: 'Link',
        linkType: 'ContentType',
        id: 'newsArticle',
      },
    },
    locale: 'en',
  },
  fields: {
    entryTitle:
      'DFDS supports campaign to attract more women into the maritime industry',
    title:
      'DFDS supports campaign to attract more women into the maritime industry',
    subtitle:
      'The Blue Denmark – a term applied to shipowners, shipping companies and many other businesses in the maritime industry – have dedicated September to women who work in shipping.',
    content:
      '![det-blaa-danmark](//images.ctfassets.net/mivicpf5zews/4rc4pvepRnMUd4ww5LbP44/1d11e15693181876cffe1e15cb1f9398/Girlpower-hero.png)\n\nThe campaign, called ‘GirlPower’, aims to attract more women into the maritime industry. It is a male-dominated world, where only 3% of Danish seafarers are women, for example.\n\nSofie Hebeltoft, Head of CSR, says: “We’re really getting behind this initiative. We have loads of exciting career options at DFDS and we’d like to see a more uniform gender balance. It’s something we’re already actively working on and which has an important place in our CSR strategy.”\n\n“In a few years’ time, the entire maritime sector will experience a labour shortage, so it’s even more important that we get more women to consider the many opportunities we can offer at sea and ashore.”\n\nDuring the campaign, the Blue Denmark will highlight a number of talented and focused young women who have all chosen a maritime career, including DFDS’ own Saira Haider, Product Owner in Logistics.\n\nSee the [GirlPower campaign page here](https://worldcareers.dk/girlpower) – read the portraits and get information about maritime education and career opportunities (in Danish).\n',
    image: {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: '4rc4pvepRnMUd4ww5LbP44',
      },
    },
    location: 'Copenhagen',
    slug:
      'dfds-supports-campaign-to-attract-more-women-into-the-maritime-industry',
    pressContact: {
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: '1rMZ0t3XSAUIIK4YcCwOWk',
      },
    },
    publicationDate: '2019-09-02',
    pageTitle:
      'DFDS supports campaign to attract more women into the maritime industry',
    seoMetaDescription:
      'The Blue Denmark have dedicated September to women who work in shipping. DFDS supports the campaign.',
    xmlSitemapPrioritySetting: '0.5',
    returnLink: {
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: '4eWp2L7Lwc4SK6cQ24kKCQ',
      },
    },
  },
}

export default (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  return res.json(data)
}
