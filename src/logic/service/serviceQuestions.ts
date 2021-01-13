import buildQuestions from '../serviceComponents/build/buildQuestions';
import deployQuestions from '../serviceComponents/deploy/deployQuestions';
import { validateInt, validateAtLeastOneOption } from '../validator';
import {
  serviceProps,
} from '../../../static/compose-data.json';
// import { Answer } from '../common';

export function serviceExtractionQuestion(choices: string[]) {
  return {
    type: 'checkbox',
    message: 'Select services to extract',
    name: 'services',
    choices,
  };
}

export const serviceCreationQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name your service',
  },
  {
    type: 'checkbox',
    message: 'Select components for your service',
    name: 'components',
    choices: serviceProps.default.concat(serviceProps.quant),
    pageSize: serviceProps.default.length + serviceProps.quant.length,
    validate: validateAtLeastOneOption,
  },
  ...serviceProps.quant.map((item) => ({
    type: 'input',
    name: `${item}-quantity`,
    message: `How many of these do you want: ${item}`,
    validate: validateInt,
    when: (answer) => answer.components.indexOf(item) !== -1,
  })),
  ...buildQuestions,
  ...deployQuestions,
];

export const serviceUseTemplateQuestion = [
  {
    type: 'confirm',
    name: 'useTemplate',
    message: 'Do you want to use predefined template for this service?',
  },
];

export function loadServiceTemplateNameQuestion(possibleTemplates: string[]): Record<string, any> {
  return {
    type: 'list',
    name: 'serviceTemplateName',
    message: 'Choose template you want to use',
    choices: possibleTemplates,
    pageSize: 5,
  };
}
