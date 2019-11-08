export let filterItemsByCriteria = ({ items, isFilter1Active, isFilter2Active, isFilter3Active }) => {
  if (!(isFilter1Active || isFilter2Active || isFilter3Active)) return items

  let result = [...items]

  if (isFilter1Active) {
    result = result.filter(item => /dfds/i.test(item.fields.entryTitle))
  }
  if (isFilter2Active) {
    result = result.filter(item => /2019-/i.test(item.fields.publicationDate))
  }
  if (isFilter3Active) {
    result = result.filter(item => /new /i.test(item.fields.entryTitle))
  }

  return result
}
