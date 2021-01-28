import { Component } from '.';
import { listOfOptions } from '../../../../static/compose-data.json';
import { placeholder } from '../../config/constants';
import { generateArrayOfMapPlaceholders, generateArrayOfKeyPlaceholders, generateArrayOfPlaceholders } from '../../placeholder/placeholderOperations';
import { Quantities } from '../../quantity';

export default function createComponent(propName: string, quantities: Quantities): Component {
  if (quantities[propName]) {
    const quantity = quantities[propName];
    switch (propName) {
      case 'volumes':
      case 'ports':
        return generateArrayOfMapPlaceholders(quantity);

      case 'environment':
      case 'args':
        return generateArrayOfKeyPlaceholders(quantity);

      default:
        return generateArrayOfPlaceholders(quantity);
    }
  } else if (listOfOptions[propName] !== undefined) {
    return listOfOptions[propName].join('|');
  } else {
    return placeholder;
  }
}
