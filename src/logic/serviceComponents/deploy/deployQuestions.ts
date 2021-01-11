import {
  serviceProps,
} from '../../../../static/compose-data.json';
import { validateAtLeastOneOption } from '../../validator';

const deployData = serviceProps.deploy;

export default [
  {
    type: 'checkbox',
    name: 'deploy-options',
    message: 'Select deploy options',
    choices: deployData.default.concat(deployData.extra),
    pageSize: deployData.default.concat(deployData.extra).length,
    when: (answer: Record<string, any>): boolean => answer.components.indexOf('deploy') !== -1,
    validate: validateAtLeastOneOption,
  },
  ...deployData.extra.map((item) => ({
    type: 'checkbox',
    name: `${item}-deploy-options`,
    message: `Select options for: ${item}`,
    choices: deployData[`${item}`],
    validate: validateAtLeastOneOption,
    when: (answer) => answer.components.indexOf('deploy') !== -1
      && answer['deploy-options'].indexOf(item) !== -1,
  })),
];
