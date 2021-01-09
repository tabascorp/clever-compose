import { AdditionalComponents } from '.';
import { ComposeData } from '../compose';
import { placeholder } from '../config/constants';

const getItemQuantity = (composeData: ComposeData, item: string): number => composeData[`${item}-quantity`];

function extractAdditionalComponents(composeData: ComposeData): AdditionalComponents {
  return composeData.additionalComponents
    .filter((item: string) => getItemQuantity(composeData, item) > 0)
    .reduce((obj: AdditionalComponents, item: string) => {
      const newObj = obj;
      newObj[item] = Array.from({ length: getItemQuantity(composeData, item) }, () => `${placeholder}:`);
      return newObj;
    }, {});
}

function createAdditionalComponents(composeData: ComposeData): AdditionalComponents {
  let addons = {};

  if (composeData.additionalComponents) {
    addons = extractAdditionalComponents(composeData);
  }

  return addons;
}

export default createAdditionalComponents;
