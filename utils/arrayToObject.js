const arrayToObject = (array, key = 'id') =>
  array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});

export default arrayToObject;
