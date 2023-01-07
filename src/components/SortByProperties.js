// Sorts the given list in ascending order, by multiple properties.
export default sortByProperties = (items, properties) => {
  return items.sort((a, b) => {
    for (const property of properties) {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
    }
    return 0;
  });
}