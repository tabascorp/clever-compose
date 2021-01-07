type Validator = (value: string) => boolean | string;

export const validateInt: Validator = function (value) {
  const parsedValue = parseFloat(value);
  if (parsedValue <= 0) return 'You need to have at least one of them';
  return Number.isInteger(parsedValue) || 'Please enter an int number';
};

export function validateIndexOf(arr: string[], errorMessage: string): Validator {
  return (value: string) => arr.indexOf(value) !== -1 || errorMessage;
}
