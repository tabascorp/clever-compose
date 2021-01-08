import { prompt } from 'inquirer';
import { serviceQuestions } from '../questions';

export default async (composeInformations: Record<string, any>) => {
  const quantity = parseInt(composeInformations['services-quantity'], 10);
  const serviceParams = [];

  for (let count = 1; count <= quantity; count += 1) {
    console.log(`\n Set information about ${count} service`);

    const answers = await prompt(serviceQuestions);
    serviceParams.push(answers);
  }

  return { serviceParams, composeInformations };
};
