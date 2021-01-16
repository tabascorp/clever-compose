import { prompt } from 'inquirer';
import { load } from 'js-yaml';
import {
  getServiceVariableQuestions,
  loadServiceTemplateNameQuestion,
  serviceCreationQuestions,
  serviceUseTemplateQuestion,
} from './serviceQuestions';
import getServiceQuantities from '../quantity/quantityOperations';
import { Service, ServiceData } from '.';
import createBuild from '../serviceComponents/build/buildOperations';
import createDeploy from '../serviceComponents/deploy/deployOperations';
import createComponent from '../serviceComponents/default/componentOperations';
import { Quantities } from '../quantity';
import { ComposeData } from '../compose';
import { listUserServiceTemplateNames, loadServiceString } from './serviceIO';
import { Answer } from '../common';
import uniqueArray from '../common/array';

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

function findVariablesInService(serviceString: string) {
  const variableRegexp = /\$\{(\w+)\}/g;
  const foundVariables: string[] = [];

  let foundVariable;
  do {
    foundVariable = variableRegexp.exec(serviceString);
    if (foundVariable) {
      foundVariables.push(foundVariable[1]);
    }
  } while (foundVariable);

  return foundVariables;
}

async function replaceServiceVariables(originalServiceString: string) {
  let serviceString = originalServiceString;
  const foundVariables = findVariablesInService(serviceString);

  if (foundVariables.length !== 0) {
    const uniqueVariables = uniqueArray(foundVariables);
    const variablesAnswers = await prompt(getServiceVariableQuestions(uniqueVariables));

    for (let i = 0; i <= Object.keys(variablesAnswers).length; i += 1) {
      const variableToReplace = `\${${foundVariables[i]}}`;
      serviceString = serviceString
        .replace(variableToReplace, `${variablesAnswers[foundVariables[i]]}`);
    }
  }

  return serviceString;
}

async function loadTemplate(templateNames: string[]) {
  const answer: Answer = await prompt(loadServiceTemplateNameQuestion(templateNames));
  const serviceString: string = await loadServiceString(answer.serviceTemplateName)
    .then(replaceServiceVariables);

  return {
    service: load(serviceString),
    serviceName: answer.serviceTemplateName.split('.', 1),
  };
}

async function askForServiceData(serviceIndex: number) {
  console.log(`\n Set information about ${serviceIndex} service`);
  const templateNames: string[] = await listUserServiceTemplateNames();
  let useTemplate = false;

  if (templateNames.length > 0) {
    const useTemplateAnswer = await prompt(serviceUseTemplateQuestion);
    useTemplate = useTemplateAnswer.useTemplate;
  }

  if (useTemplate) {
    return loadTemplate(templateNames);
  }

  const answers = await prompt(serviceCreationQuestions);
  return {
    service: processServiceData(answers),
    serviceName: answers.name,
  };
}

export async function askForServicesData(composeData: ComposeData) {
  const quantity = parseInt(composeData['services-quantity'], 10);
  const services = {};

  for (let serviceIndex = 1; serviceIndex <= quantity; serviceIndex += 1) {
    const { service, serviceName } = await askForServiceData(serviceIndex);
    services[serviceName] = service;
  }

  return { services, composeData };
}
