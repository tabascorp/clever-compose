const validateInt = function (value) {
  if (value <= 0) return 'You need to have at least one of them';
  return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
}

export default () => { validateInt }