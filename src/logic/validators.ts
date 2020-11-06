export const validateInt = (value: string): (boolean | string) => {
  if (parseFloat(value) <= 0) return 'You need to have at least one of them';
  return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
}

type Validator = (value: string) => (boolean | string)

export const validateIndexOf = (versions: string[], errorMessage: string): Validator => {
  return (value: string) => versions.indexOf(value) !== -1 || errorMessage
}