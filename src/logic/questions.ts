import { versions, addons, serviceProps } from '../../static/compose-data.json'
import { validateInt, validateIndexOf } from "./validators"

const deployData = serviceProps.deploy
const buildData = serviceProps.build

export const composeQuestions = [
  {
    type: 'input',
    name: 'compose-version',
    message: 'Which version of docker-compose you want to use?',
    validate: validateIndexOf(versions, 'Please enter valid docker-compose version'),
    default: versions[versions.length - 1]
  },
  {
    type: 'input',
    name: 'services-quantity',
    message: 'How many services you want to create?',
    validate: validateInt,
    default: 2
  },
  {
    type: 'checkbox',
    message: 'Select additional components',
    name: 'additional-components',
    choices: [
      ...addons.map((item) => {
        return {
          name: item
        };
      })
    ]
  },
  ...addons.map((item) => {
    return {
      type: 'input',
      name: `${item}-quantity`,
      message: `How many ${item} do you want?`,
      validate: validateInt,
      when: (answer) => answer['additional-components'].indexOf(item) !== -1
    };
  })
];

const deployQuestions = [
  {
    type: 'checkbox',
    name: 'deploy-options',
    message: 'Select deploy options',
    choices: deployData.default.concat(deployData.extra),
    pageSize: deployData.default.concat(deployData.extra).length,
    when: (answer) => answer['components'].indexOf('deploy') !== -1
  },
  ...deployData.extra.map((item) => {
    return {
      type: 'checkbox',
      name: `${item}-deploy-options`,
      message: `Select options for: ${item}`,
      choices: deployData[`${item}`],
      when: (answer) => answer['components'].indexOf('deploy') !== -1 && answer['deploy-options'].indexOf(item) !== -1
    };
  })
];

const buildQuestions = [
  {
    type: 'checkbox',
    name: 'build-options',
    message: 'Select build options',
    choices: buildData.default,
    pageSize: buildData.default.length,
    when: (answer) => answer['components'].indexOf('build') !== -1
  },
  ...buildData.quant.map((item) => {
    return {
      type: 'input',
      name: `${item}-quantity`,
      message: `How many ${item} in build component do you want?`,
      validate: validateInt,
      when: (answer) => answer['components'].indexOf('build') !== -1 && answer['build-options'].indexOf(item) !== -1
    };
  })
];

export const serviceQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name your service'
  },
  {
    type: 'checkbox',
    message: 'Select components for your service',
    name: 'components',
    choices: serviceProps.default.concat(serviceProps.quant),
    pageSize: serviceProps.default.length + serviceProps.quant.length
  },
  ...serviceProps.quant.map((item) => {
    return {
      type: 'input',
      name: `${item}-quantity`,
      message: `How many of these do you want: ${item}`,
      validate: validateInt,
      when: (answer) => answer['components'].indexOf(item) !== -1
    };
  }),
  ...buildQuestions,
  ...deployQuestions
];