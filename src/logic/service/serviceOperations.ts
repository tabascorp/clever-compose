import { prompt } from 'inquirer';
import { loadServiceTemplateNameQuestion, serviceCreationQuestions, serviceUseTemplateQuestion } from './serviceQuestions';
import getServiceQuantities from '../quantity/quantityOperations';
import { Service, ServiceData } from '.';
import createBuild from '../serviceComponents/build/buildOperations';
import createDeploy from '../serviceComponents/deploy/deployOperations';
import createComponent from '../serviceComponents/default/componentOperations';
import { Quantities } from '../quantity';
import { ComposeData } from '../compose';
import { listUserServiceTemplateNames, loadService } from './serviceIO';
import { Answer } from '../common';

function createService(serviceData: ServiceData, quantities: Quantities): Service {
  const service = {};

  serviceData.components.forEach((component: string) => {
    switch (component) {
      case 'deploy':
        service[component] = createDeploy(serviceData);
        break;

      case 'build':
        service[component] = createBuild(serviceData, quantities);
        break;

      default:
        service[component] = createComponent(component, quantities);
    }
  });

  return service;
}

export function processServiceData(serviceData: ServiceData): Service {
  const quantities = getServiceQuantities(serviceData);
  return createService(serviceData, quantities);
}

export async function askForServiceData(composeData: ComposeData) {
  const quantity = parseInt(composeData['services-quantity'], 10);
  const services = {};
  let service: Service = null;
  let serviceName: string = '';

  for (let count = 1; count <= quantity; count += 1) {
    console.log(`\n Set information about ${count} service`);
    const templateNames: string[] = await listUserServiceTemplateNames();
    let useTemplate = false;

    if (templateNames.length > 0) {
      const useTemplateAnswer = await prompt(serviceUseTemplateQuestion);
      useTemplate = useTemplateAnswer.useTemplate;
    }

    if (useTemplate) {
      const answer: Answer = await prompt(loadServiceTemplateNameQuestion(templateNames));
      service = await loadService(answer.serviceTemplateName);
      serviceName = answer.serviceTemplateName.split('.', 1);
    } else {
      const answers = await prompt(serviceCreationQuestions);
      service = processServiceData(answers);
      serviceName = answers.name;
    }

    services[serviceName] = service;
  }

  return { services, composeData };
}
