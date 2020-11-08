import { listOfOptions } from '../../../static/compose-data.json';
import ph from './constants';

export default (propName, quantities) => {
  if (quantities[propName]) {
    switch (propName) {
      case 'volumes':
      case 'ports':
        return new Array(quantities[propName]).fill(`${ph}:${ph}`);

      case 'env':
      case 'args':
        return new Array(quantities[propName]).fill(`KEY=${ph}`);

      default:
        return new Array(quantities[propName]).fill(ph);
    }
  } else if (listOfOptions[propName] !== undefined) {
    return listOfOptions[propName].join('|');
  } else {
    return ph;
  }
};
