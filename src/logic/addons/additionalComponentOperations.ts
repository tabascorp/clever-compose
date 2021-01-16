import { AdditionalComponents } from '.';
import { ComposeData } from '../compose';
import { generateArrayOfPlaceholdersWithColon, generateArrayOfMapPlaceholders } from '../placeholder/placeholderOperations';

const getItemQuantity = (composeData: ComposeData, item: string): number => composeData[`${item}-quantity`];

function createAdditionalComponents(composeData: ComposeData): AdditionalComponents {
  const addons = {};

  if (!composeData['additional-components']) return addons;

  const componentsToFill = composeData['additional-components']
    .filter((item: string) => getItemQuantity(composeData, item) > 0);

  componentsToFill.forEach((component: string) => {
    const quantity = getItemQuantity(composeData, component);

    if (component === 'networks') {
      addons[component] = generateArrayOfPlaceholdersWithColon(quantity);
    } else {
      addons[component] = generateArrayOfMapPlaceholders(quantity);
    }
  });

  return addons;
}

export default createAdditionalComponents;
