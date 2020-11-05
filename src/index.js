const inquirer = require('inquirer');
const composeQuestions = require('./questions').composeQuestions;
const serviceQuestions = require('./questions').serviceQuestions;
const buildYml = require('./build-file');

const init = function () {
  inquirer.prompt(composeQuestions).then((answers) => {
    selectServiceProps(answers);
  });
};

const selectServiceProps = function (params) {
  var quantity = parseInt(params['services-quantity']);
  var count = 1;
  var servicesParams = [];

  const askQuestion = () => {
    console.log(`\n Set information about ${count} service`);
    inquirer.prompt(serviceQuestions).then((response) => {
      servicesParams.push(response);
      count++;
      if (count <= quantity) {
        askQuestion();
      } else {
        buildYml(servicesParams, params);
      }
    })
  };
  askQuestion();
};

module.exports = { init };