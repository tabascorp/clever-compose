import { prompt } from 'inquirer';
import { serviceCreationQuestions } from './serviceQuestions';
import getServiceQuantities from '../quantity/quantityOperations';
import createBuild from '../build/buildOperations';
import { Service, ServiceData, Services } from '.';
import createDeploy from '../deploy/deployOperations';
import createComponent from '../component/componentOperations';
import { Quantities } from '../quantity';
import { ComposeData } from '../compose';

export async function askForServiceData(composeData: ComposeData) {
  const quantity = parseInt(composeData['services-quantity'], 10);
  const serviceData = [];

  for (let count = 1; count <= quantity; count += 1) {
    console.log(`\n Set information about ${count} service`);

    const answers = await prompt(serviceCreationQuestions);
    serviceData.push(answers);
  }

  return { serviceData, composeData };
}

function createService(serviceData: ServiceData, quantities: Quantities): Service {
  const service = {};

  serviceData.components.forEach((component: string) => {
    switch (component) {
      case 'deploy':
        service[component] = createDeploy(service);
        break;

      case 'build':
        service[component] = createBuild(service, quantities);
        break;

      default:
        service[component] = createComponent(component, quantities);
    }
  });

  return service;
}

export function createServices(servicesData: ServiceData[]): Services {
  const servicesJson = {};

  servicesData.forEach((serviceData) => {
    const quantities = getServiceQuantities(serviceData);
    servicesJson[serviceData.name] = createService(serviceData, quantities);
  });

  return servicesJson;
}
