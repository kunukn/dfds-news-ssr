export let filterItemsByCriteria = ({ items, isDfds, is2019, is2018 }) => {
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
