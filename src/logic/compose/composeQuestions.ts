import {
  versions,
  addons,
} from '../../../static/compose-data.json';
import { validateInt, validateIndexOf } from '../validator';

export default [
  {
    type: 'input',
    name: 'compose-version',
    message: 'Which version of docker-compose you want to use?',
    validate: validateIndexOf(
      versions,
      'Please enter valid docker-compose version',
    ),
    default: versions[versions.length - 1],
  },
  {
    type: 'input',
    name: 'services-quantity',
    message: 'How many services you want to create?',
    validate: validateInt,
    default: 2,
  },
  {
    type: 'checkbox',
    message: 'Select additional components',
    name: 'additional-components',
    choices: [
      ...addons.map((item) => ({
        name: item,
      })),
    ],
  },
  ...addons.map((item) => ({
    type: 'input',
    name: `${item}-quantity`,
    message: `How many ${item} do you want?`,
    validate: validateInt,
    when: (answer) => answer['additional-components'].indexOf(item) !== -1,
  })),
];
