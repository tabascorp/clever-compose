import { serviceProps } from '../../../static/compose-data.json';

function containsQuantComponent(service: Record<string, any>, quantComponent: string) {
  return service.components.indexOf(quantComponent) !== -1;
}

function getServiceComponentQuantity(service: Record<string, any>, quantComponent: string): any {
  return parseInt(service[`${quantComponent}-quantity`], 10);
}

function getServiceComponentQuantityFor(service: Record<string, any>, quant: Record<string, any>) {
  const quantities = {};

  quant.forEach((quantComponent) => {
    if (containsQuantComponent(service, quantComponent)) {
      quantities[quantComponent] = getServiceComponentQuantity(service, quantComponent);
    }
  });

  return quantities;
}

export default (service: Record<string, any>) => ({
  ...getServiceComponentQuantityFor(service, serviceProps.quant),
  ...getServiceComponentQuantityFor(service, serviceProps.build.quant),
});
