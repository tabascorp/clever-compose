import { placeholder } from '../config/constants';

function parseServiceInfoNumbers(composeData: Record<string, any>): Record<string, any> {
  const result = {};

  Object.keys(composeData).forEach((key) => {
    if (key.endsWith('-quantity')) {
      result[key] = parseInt(composeData[key], 10);
    } else {
      result[key] = composeData[key];
    }
  });

  return result;
}

const getItemQuantity = (composeData: Record<string, any>, item: string): number => composeData[`${item}-quantity`];

const extractAdditionalComponents = (composeData) => composeData.additionalComponents
  .filter((item: string) => getItemQuantity(composeData, item) > 0)
  .reduce((obj: Record<string, any>, item: string) => {
    const newObj = obj;
    newObj[item] = new Array(getItemQuantity(composeData, item)).fill(`${placeholder}:`);
    return newObj;
  }, {});

function createAdditionalComponents(composeData: Record<string, any>): Record<string, any> {
  let addons = {};

  const parsedServiceInfo = parseServiceInfoNumbers(composeData);

  if (parsedServiceInfo.additionalComponents) {
    addons = extractAdditionalComponents(parsedServiceInfo);
  }

  return addons;
}

export default createAdditionalComponents;
