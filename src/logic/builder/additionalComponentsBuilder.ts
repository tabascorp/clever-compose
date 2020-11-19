import ph from './constants';

function parseServiceInfoNumbers(serviceInfo: Record<string, any>): Record<string, any> {
  const result = {};

  Object.keys(serviceInfo).forEach((key) => {
    if (key.endsWith('-quantity')) {
      result[key] = parseInt(serviceInfo[key], 10);
    } else {
      result[key] = serviceInfo[key];
    }
  });

  return result;
}

const getItemQuantity = (serviceInfo: Record<string, any>, item: string): number => serviceInfo[`${item}-quantity`];

const processAdditionalComponents = (serviceInfo) => serviceInfo.additionalComponents
  .filter((item: string) => getItemQuantity(serviceInfo, item) > 0)
  .reduce((obj: Record<string, any>, item: string) => {
    const newObj = obj;
    newObj[item] = new Array(getItemQuantity(serviceInfo, item)).fill(`${ph}:`);
    return newObj;
  }, {});

export default (serviceInfo: Record<string, any>): Record<string, any> => {
  let addons = {};

  const parsedServiceInfo = parseServiceInfoNumbers(serviceInfo);

  if (parsedServiceInfo.additionalComponents) {
    addons = processAdditionalComponents(parsedServiceInfo);
  }

  return addons;
};
