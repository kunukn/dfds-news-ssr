// List overview
// https://cdn.contentful.com/spaces/mivicpf5zews/environments/master/entries?content_type=newsArticle&locale=en&select=sys.id,fields.entryTitle,fields.publicationDate&order=-fields.publicationDate&limit=10&skip=0&access_token=102b6ce0b5beb8e64d0139b604153c92f7476229ee4d2ed5fa3608f2b72640e4

// Details page
// https://cdn.contentful.com/spaces/mivicpf5zews/environments/master/entries/6IMNKTmUUkPRq7SphXcY0U?access_token=102b6ce0b5beb8e64d0139b604153c92f7476229ee4d2ed5fa3608f2b72640e4

import showdown from "showdown";
import Collapse from "@kunukn/react-collapse";
import cx from "clsx";
import { useStore } from "laco-react";
import debounce from "lodash.debounce";

import store from "~/store.js";
import getArticle from "~/api-layer/getArticle";
import getNewsList from "~/api-layer/getNewsList";
import getQueryParams from "~/utils/getQueryParams";

import Header from "~/components/header/Header";
import Overview from "~/components/overview/Overview";
import Details from "~/components/details/Details";
import Footer from "~/components/footer/Footer";
import Filter from "~/components/filter/Filter";

import DFDSLogo from "~/public/static/icons/DFDSLogo.svg";
import CloseIcon from "~/public/static/icons/Close.svg";
import NextIcon from "~/public/static/icons/Next.svg";
import PreviousIcon from "~/public/static/icons/Previous.svg";

const defaultDocTitle = "DFDS NEWS";

const Index = ({ items: itemsProp = [] }) => {
  let cache = React.useRef({}).current;

  const { somethingTempVariable } = useStore(store);

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
      document.body.style.fontFamily = "Roboto, sans-serif";
    } else {
      document.body.style.fontFamily = "";
    }
  }, [isFilter3Active]);

  // Rendered items
  React.useEffect(() => {
    let result = filterItemsByCriteria({
      items,
      isDfds: isFilter1Active,
      is2019: isFilter2Active
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

    setIsDetailsOpen(true);
  };

  return (
    <>
      <Overview
        {...{
          items: renderedItems,
          onItemClick,
          isDetailsOpen
        }}
      />
      <Header
        {...{
          count: renderedItems.length,
          setIsFilterOpen
        }}
      />

      <Details
        {...{
          isDetailsOpen,
          setIsDetailsOpen,
          selectedArticle,
          isDetailsExpanded,
          toggleExpanded: () => setIsDetailsExpanded(s => !s)
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
          onClose: () => setIsFilterOpen(false)
        }}
      />

      {true && <Footer {...{}} />}
      <style jsx>{``}</style>
    </>
  );
};

Index.getInitialProps = async ({ req, query }) => {
  return getNewsList();
};

export default Index;

let filterItemsByCriteria = ({ items, isDfds, is2019, is2018 }) => {
  let result = [...items];

  if (isDfds) {
    result = result.filter(item => /dfds/i.test(item.fields.entryTitle));
  }
  if (is2019) {
    result = result.filter(item => /2019-/i.test(item.fields.publicationDate));
  }
  if (is2018) {
    result = result.filter(item => /2018-/i.test(item.fields.publicationDate));
  }

  return result;
};
