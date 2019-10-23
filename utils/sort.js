export let sortByDateDescending = (a, b) => {
  if (!a || !a.fields || !a.fields.publicationDate) return 0;

  if (a.fields.publicationDate < b.fields.publicationDate) return 1;
  if (a.fields.publicationDate > b.fields.publicationDate) return -1;
  return 0;
};

export let sortByDateAscending = (a, b) => sortByDateDescending(b, a);
