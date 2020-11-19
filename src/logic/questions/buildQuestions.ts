import {
  serviceProps,
} from '../../../static/compose-data.json';
import { validateInt } from '../validator';

const buildData = serviceProps.build;

export default [
  {
    type: 'checkbox',
    name: 'build-options',
    message: 'Select build options',
    choices: buildData.default,
    pageSize: buildData.default.length,
    when: (answer) => answer.components.indexOf('build') !== -1,
  },
  ...buildData.quant.map((item) => ({
    type: 'input',
    name: `${item}-quantity`,
    message: `How many ${item} in build component do you want?`,
    validate: validateInt,
    when: (answer) => answer.components.indexOf('build') !== -1
      && answer['build-options'].indexOf(item) !== -1,
  })),
];
