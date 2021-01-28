export default function uniqueArray<T>(array: T[]): T[] {
  const uniqueValues = [];
  array.forEach((item) => {
    if (uniqueValues.indexOf(item) === -1) {
      uniqueValues.push(item);
    }
  });
  return uniqueValues;
}
