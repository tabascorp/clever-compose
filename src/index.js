const inquirer = require('inquirer');
const cleverService = require('./clever-services');

var questions = [
  {
    type: 'input',
    name: 'composeVersion',
    message: 'Which version of docker-compose you want to use?',
    validate: function (value) {
        var choices = ['1', '1.0', '2', '2.0', '2.1','2.2', '2.3', '2.4', '3', '3.0', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8'];
        return choices.indexOf(value) !== -1 || 'Please enter valid docker-compose version';
    }
  },
  {
    type: 'input',
    name: 'servicesQuantity',
    message: 'How many services you want to create?',
    validate: function (value) {
      if(value <= 0) return 'You need to have at least one service';
      return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
    }
  },
  {
    type: 'checkbox',
    message: 'Select additional components',
    name: 'additionalComponents',
    choices: [
      {
        name: 'networks',
      },
      {
        name: 'volumes',
      },
    ]
  },
  {
    type: 'input',
    name: 'volumesQuantity',
    message: 'How many volumes you want to use?',
    validate: function (value) {
      if(value <= 0) return 'You need to have at least one volume';
      return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
    },
    when: (answer) => answer.additionalComponents.indexOf('Volumes') !== -1
  },
  {
    type: 'input',
    name: 'networkQuantity',
    message: 'How many networks you want to use?',
    validate: function (value) {
      if(value <= 0) return 'You need to have at least one network';
      return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
    },
    when: (answer) => answer.additionalComponents.indexOf('Network') !== -1
  }
];

inquirer.prompt(questions).then((answers) => {
  cleverService.selectServiceProps(answers);
});