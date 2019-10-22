// List overview
// https://cdn.contentful.com/spaces/mivicpf5zews/environments/master/entries?content_type=newsArticle&locale=en&select=sys.id,fields.entryTitle,fields.publicationDate&order=-fields.publicationDate&limit=10&skip=0&access_token=102b6ce0b5beb8e64d0139b604153c92f7476229ee4d2ed5fa3608f2b72640e4

// Details page
// https://cdn.contentful.com/spaces/mivicpf5zews/environments/master/entries/6IMNKTmUUkPRq7SphXcY0U?access_token=102b6ce0b5beb8e64d0139b604153c92f7476229ee4d2ed5fa3608f2b72640e4

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextHead from 'next/head';
//import cx from "clsx";
//import { useStore } from "laco-react";
//import debounce from "lodash.debounce";

//import store from "~/store.js";
import getArticle from '~/api-layer/getArticle';
import getNewsList from '~/api-layer/getNewsList';
import getQueryParams from '~/utils/getQueryParams';
import { filterItemsByCriteria } from '~/utils/filter';

import Header from '~/components/header/Header';
import Overview from '~/components/overview/Overview';
//import Details from "~/components/details/Details";
//import Footer from "~/components/footer/Footer";
//import Filter from "~/components/filter/Filter";

const Details = dynamic(() => import('~/components/details/Details'), {
  ssr: false,
});
const Footer = dynamic(() => import('~/components/footer/Footer'), {
  ssr: false,
});
const Filter = dynamic(() => import('~/components/filter/Filter'), {
  ssr: false,
});

const defaultDocTitle = 'DFDS NEWS';

const Index = ({ items: itemsProp = [] }) => {
  let cache = React.useRef({}).current;

  //const { somethingTempVariable } = useStore(store);

  let [items, setItems] = React.useState(itemsProp);
  let [renderedItems, setRenderedItems] = React.useState(itemsProp);
  let [isDetailsExpanded, setIsDetailsExpanded] = React.useState(true);
  let [selectedArticle, setSelectedArticle] = React.useState();
  let [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  let [isFilterOpen, setIsFilterOpen] = React.useState(false);

  let [isFilter1Active, setIsFilter1Active] = React.useState(false);
  let [isFilter2Active, setIsFilter2Active] = React.useState(false);
  let [isFilter3Active, setIsFilter3Active] = React.useState(false);

  let onFilterClick1 = () => {
    setIsFilter1Active(s => !s);
  };
  let onFilterClick2 = () => {
    setIsFilter2Active(s => !s);
  };
  let onFilterClick3 = () => {
    setIsFilter3Active(s => !s);
  };

  React.useEffect(() => {
    document.title = defaultDocTitle;

    let getNews = async () => {
      let news = await getNewsList(200);
      setItems((news && news.items) || []);
    };

    getNews();
    //setTimeout(getNews, 2000);
  }, []);

  React.useEffect(() => {
    let params = getQueryParams();

    if (+params.filter) setIsFilterOpen(true);

    if (+params.roboto) setIsFilter3Active(true);

    if (+params.item) {
      let index = +params.item;
      index && onItemClick(items[index - 1].sys.id);
    } else if (params.id) {
      onItemClick(params.id);
    }
  }, [items]);

  React.useEffect(() => {
    if (isFilter3Active) {
      document.body.style.fontFamily = 'Roboto, sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }
  }, [isFilter3Active]);

  // Rendered items
  React.useEffect(() => {
    let result = filterItemsByCriteria({
      items,
      isDfds: isFilter1Active,
      is2019: isFilter2Active,
    });
    setRenderedItems(result);
  }, [items, isFilter1Active, isFilter2Active]);

  React.useEffect(() => {
    window.items = items;
  }, [items]);

  React.useEffect(() => {
    if (isDetailsOpen) {
      //document.body.style.overflow = 'hidden';
    } else {
      //document.body.style.overflow = '';
    }
  }, [isDetailsOpen]);

  React.useEffect(() => {
    if (isDetailsOpen) {
      if (
        selectedArticle &&
        selectedArticle.fields &&
        selectedArticle.fields.title
      ) {
        document.title = selectedArticle.fields.title;
      }
    } else {
      document.title = defaultDocTitle;
    }
  }, [isDetailsOpen, selectedArticle]);

  if (!items) return <div className="news">Failed loading data, sorry.</div>;

  let onItemClick = async id => {
    if (cache[id]) {
      let result = cache[id];
      setSelectedArticle(result);
    } else {
      let result = await getArticle(id);
      cache[id] = result;
      setSelectedArticle(result);
    }

    if (history.pushState) {
      var newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?id=' +
        id;
      window.history.pushState({ path: newurl }, '', newurl);
    }

    setIsDetailsOpen(true);
  };

  return (
    <>
      <NextHead>
        <title>{defaultDocTitle}</title>
      </NextHead>
      <Overview
        {...{
          items: renderedItems,
          onItemClick,
          isDetailsOpen,
        }}
      />
      <Header
        {...{
          count: renderedItems.length,
          setIsFilterOpen,
        }}
      />

      <Details
        {...{
          isDetailsOpen,
          setIsDetailsOpen,
          selectedArticle,
          isDetailsExpanded,
          toggleExpanded: () => setIsDetailsExpanded(s => !s),
        }}
      />

      <Filter
        {...{
          isFilterOpen,
          isFilter1Active,
          isFilter2Active,
          isFilter3Active,
          onFilterClick1,
          onFilterClick2,
          onFilterClick3,
          onClose: () => setIsFilterOpen(false),
        }}
      />

      <Footer {...{}} />
      <style jsx>{``}</style>
    </>
  );
};

Index.getInitialProps = async ({ req, query }) => {
  return getNewsList();
};

export default Index;
