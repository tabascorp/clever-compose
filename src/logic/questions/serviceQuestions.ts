import {
  serviceProps,
} from '../../../static/compose-data.json';
import { validateInt } from '../validator';

import buildQuestions from './buildQuestions';
import deployQuestions from './deployQuestions';

export default [
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
