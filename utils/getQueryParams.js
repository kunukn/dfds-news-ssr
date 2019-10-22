const getQueryParams = () => {
  if (typeof window === 'undefined') return {};

  const params = {};

  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3;
  });

  return params;
};

export default getQueryParams;
