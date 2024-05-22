export function sortBy<T>(key: keyof T) {
  return function (a: T, b: T) {
    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === 'string' && typeof valueB === 'string') return valueA.localeCompare(valueB);
    else if (valueA < valueB) return -1;
    else if (valueA > valueB) return 1;

    return 0;
  };
}
