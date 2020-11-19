import { prompt } from 'inquirer';
import { serviceQuestions } from '../questions';
import buildYml from '../builder/fileBuilder';

function askServiceDetails(fn: (result: any) => void): Promise<void> {
  return prompt(serviceQuestions).then(fn);
}

export default (params: Record<string, any>) => {
  const quantity = parseInt(params['services-quantity'], 10);
  const servicesParams = [];
  let count = 1;

  const askQuestion = () => {
    console.log(`\n Set information about ${count} service`);

    askServiceDetails((response) => {
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
