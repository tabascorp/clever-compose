import { Component } from '.';
import { listOfOptions } from '../../../static/compose-data.json';
import { placeholder } from '../config/constants';
import { Quantities } from '../quantity';

export default function createComponent(propName: string, quantities: Quantities): Component {
  if (quantities[propName]) {
    switch (propName) {
      case 'volumes':
      case 'ports':
        return new Array(quantities[propName]).fill(`${placeholder}:${placeholder}`);

      case 'env':
      case 'args':
        return new Array(quantities[propName]).fill(`KEY=${placeholder}`);

      default:
        return new Array(quantities[propName]).fill(placeholder);
    }
  } else if (listOfOptions[propName] !== undefined) {
    return listOfOptions[propName].join('|');
  } else {
    return placeholder;
  }
}
