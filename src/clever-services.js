const inquirer = require('inquirer');
const buildYml = require('./build-file');
const serviceProps = require('./compose-data.json').serviceProps;
const deployQuestions = require('./deployment-questions');

var questions = [
  {
    type: 'input',
    name: 'service-name',
    message: 'Name your service'
  },
  {
    type: 'checkbox',
    message: 'Select components for your service',
    name: 'service-components',
    choices: [
      ...serviceProps.default.map((item) => {
        return {
          name: item
        };
      }),
      ...serviceProps.quant.map((item) => {
        return {
          name: item
        }
      })
    ],
    pageSize: serviceProps.default.length + serviceProps.quant.length
  },
  ...serviceProps.quant.map((item) => {
    return {
      type: 'input',
      name: `${item}-quantity`,
      message: `How many of these do you want: ${item}`,
      validate: function (value) {
        if(value <= 0) return 'You need to have at least one';
        return Number.isInteger(parseFloat(value)) || 'Please enter an int number';
      },
      when: (answer) => answer['service-components'].indexOf(item) !== -1
    };
  }),
  ...deployQuestions
];

var selectServiceProps = function(params){
  var quantity = parseInt(params['services-quantity']);
  var count = 1;
  var servicesParams = [];

  const askQuestion = () => {
    console.log(`\n Set information about ${count} service`);
    inquirer.prompt(questions).then((response) => {
      servicesParams.push(response);
      count++;
      if (count <= quantity) {
        askQuestion ();
      } else {
        buildYml(servicesParams, params);
      }
    })
  };
  askQuestion();
}

module.exports = { selectServiceProps };