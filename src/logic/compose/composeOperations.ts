import Compose, { ComposeData } from '.';
import createAdditionalComponents from '../addons/additionalComponentOperations';
import { Services } from '../service';
import { AdditionalComponents } from '../addons';

export function createCompose(
  services: Services,
  additionalComponents: AdditionalComponents,
  composeData: ComposeData,
): Compose {
  return new Compose(
    composeData['compose-version'],
    services,
    additionalComponents.volumes,
    additionalComponents.networks,
  );
}

export function preprocessComposeData(composeData: ComposeData): ComposeData {
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

export function processComposeData({ services, composeData }) {
  const composeDataWithQuantities = preprocessComposeData(composeData);
  const additionalComponents = createAdditionalComponents(composeDataWithQuantities);
  return createCompose(services, additionalComponents, composeDataWithQuantities);
}
