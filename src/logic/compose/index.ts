import { prompt } from 'inquirer';
import { serviceQuestions } from '../questions';

export default async (composeInformations: Record<string, any>) => {
  const quantity = parseInt(composeInformations['services-quantity'], 10);

  let promptQuestions = new Promise(() => { serviceParams: [] });

  for(let count = 1; count <= quantity; count += 1) {
    console.log(`\n Set information about ${count} service`);
    promptQuestions = promptQuestions.then(async ({serviceParams}) => {
      return prompt(serviceQuestions).then((response) => { 
        serviceParams.push(response)
        return {serviceParams}
      });
    });
  }

  return promptQuestions.then(({serviceParams}) => ({serviceParams, composeInformations}));
};
