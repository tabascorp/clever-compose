import { prompt } from 'inquirer';
import { serviceCreationQuestions } from './serviceQuestions';
import getServiceQuantities from '../quantity/quantityOperations';
import buildDeployJson from '../deploy/deployOperations';
import createBuild from '../build/buildOperations';
import getComponentValue from '../component/componentOperations';

export async function askForServiceData(composeData: Record<string, any>) {
  const quantity = parseInt(composeData['services-quantity'], 10);
  const serviceData = [];

  for (let count = 1; count <= quantity; count += 1) {
    console.log(`\n Set information about ${count} service`);

    const answers = await prompt(serviceCreationQuestions);
    serviceData.push(answers);
  }

  return { serviceData, composeData };
}

const buildServiceJson = (service: any, quantities: any) => {
  const serviceJson = {};

  service.components.forEach((component) => {
    switch (component) {
      case 'deploy':
        serviceJson[component] = buildDeployJson(service);
        break;

      case 'build':
        serviceJson[component] = createBuild(service, quantities);
        break;

      default:
        serviceJson[component] = getComponentValue(component, quantities);
    }
  });

  return serviceJson;
};

export function createServices(services) {
  const servicesJson = {};

  services.forEach((service) => {
    const quantities = getServiceQuantities(service);
    servicesJson[service.name] = buildServiceJson(service, quantities);
  });

  return servicesJson;
}
