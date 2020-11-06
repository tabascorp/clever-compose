import { prompt } from 'inquirer';
import { composeQuestions, serviceQuestions } from './questions';
import buildYml from './buildFile';

const selectServiceProps = (params) => {
  const quantity: number = parseInt(params['services-quantity'], 10);
  const servicesParams = [];
  let count = 1;

  const askQuestion = () => {
    console.log(`\n Set information about ${count} service`);

    prompt(serviceQuestions).then((response) => {
      servicesParams.push(response);
      count += 1;

      if (count <= quantity) {
        askQuestion();
      } else {
        buildYml(servicesParams, params);
      }
    });
  };

  askQuestion();
};

export default (): Promise<void> => prompt(composeQuestions)
  .then((answers) => selectServiceProps(answers));
