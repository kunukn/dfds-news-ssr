export let monthNamesShort = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export let monthNamesLong = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export let formatDate = (date, months = monthNamesLong) => {
  try {
    return `${+date.substring(8, 10)} ${
      months[+date.substring(5, 7)]
    } ${+date.substring(0, 4)}`;
  } catch (ex) {}

  return date;
};

export let formatShortDate = date => formatDate(date, monthNamesShort);

export let formatLongDate = date => formatDate(date);
