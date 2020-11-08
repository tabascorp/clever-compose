import ph from './constants';

export default (serviceInfo: Record<string, any>): Record<string, any> => {
  const addons = {};

  if (serviceInfo.additionalComponents) {
    serviceInfo.additionalComponents
      .forEach((item: string) => { addons[item] = new Array(parseInt(serviceInfo[`${item}-quantity`], 10)).fill(`${ph}:`); });
  }

  return addons;
};
