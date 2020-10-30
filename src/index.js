const inquirer = require('inquirer');
const cleverService = require('./clever-services');
const composeData = require('./compose-data.json');

var questions = [
  {
    type: 'input',
    name: 'composeVersion',
    message: 'Which version of docker-compose you want to use?',
    validate: function (value) {
        var choices = composeData.versions;
        return choices.indexOf(value) !== -1 || 'Please enter valid docker-compose version';
    },
    default: composeData.versions[composeData.versions.length - 1]
  },
  {
    type: 'input',
    name: 'servicesQuantity',
    message: 'How many services you want to create?',
    validate: function (value) {
      if(value <= 0) return 'You need to have at least one service';
      return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
    },
    default: 2
  },
  {
    type: 'checkbox',
    message: 'Select additional components',
    name: 'additionalComponents',
    choices: [
      ...composeData.addons.map((item) => {
        return {
          name: item
        };
      })
    ]
  },
  ...composeData.addons.map((item) => {
    return {
      type: 'input',
      name: `${item}Quantity`,
      message: `How many ${item} do you want?`,
      validate: function (value) {
        if(value <= 0) return 'You need to have at least one';
        return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
      },
      when: (answer) => answer.additionalComponents.indexOf(item) !== -1
    };
  })
];

const init = function() {
  inquirer.prompt(questions).then((answers) => {
    cleverService.selectServiceProps(answers);
  });
}

module.exports = { init };