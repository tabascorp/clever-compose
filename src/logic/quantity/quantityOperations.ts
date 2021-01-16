import { Quantities } from '.';
import { serviceProps } from '../../../static/compose-data.json';
import { Service } from '../service';

function containsQuantComponent(service: Service, quantComponent: string): boolean {
  return service.components.indexOf(quantComponent) !== -1;
}

function getServiceComponentQuantity(service: Service, quantComponent: string): number {
  return parseInt(service[`${quantComponent}-quantity`], 10);
}

function getServiceComponentQuantityFor(service: Service, quantityNames: string[]): Quantities {
  const quantities = {};

  quantityNames.forEach((quantityName) => {
    if (containsQuantComponent(service, quantityName)) {
      quantities[quantityName] = getServiceComponentQuantity(service, quantityName);
    }
  });

  return quantities;
}

export default function createQuantities(service: Service): Quantities {
  return {
    ...getServiceComponentQuantityFor(service, serviceProps.quant),
    ...getServiceComponentQuantityFor(service, serviceProps.build.quant),
  };
}
