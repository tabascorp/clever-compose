import { prompt } from 'inquirer';
import composeQuestions from './composeQuestions';
import Compose from '.';
import { createServices } from '../service/serviceOperations';
import createAdditionalComponents from '../addons/additionalComponentOperations';

export async function askForComposeData() {
  return prompt(composeQuestions);
}

export function createCompose(services, addons, composeData) {
  return new Compose(
    composeData['compose-version'],
    services,
    addons.networks,
    addons.volumes,
  );
}

export function processComposeData({ serviceData, composeData }) {
  const services = createServices(serviceData);
  const additionalComponents = createAdditionalComponents(composeData);
  return createCompose(services, additionalComponents, composeData);
}
