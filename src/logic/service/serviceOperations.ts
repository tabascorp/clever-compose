import { prompt } from 'inquirer';
import { serviceCreationQuestions } from './serviceQuestions';

export default async function createServices(composeInformation: Record<string, any>) {
  const quantity = parseInt(composeInformation['services-quantity'], 10);
  const serviceParams = [];

  for (let count = 1; count <= quantity; count += 1) {
    console.log(`\n Set information about ${count} service`);

    const answers = await prompt(serviceCreationQuestions);
    serviceParams.push(answers);
  }

  return { serviceParams, composeInformation };
}
