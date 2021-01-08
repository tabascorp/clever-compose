import { prompt } from 'inquirer';
import composeQuestions from './compose/composeQuestions';
import createServices from './service/serviceOperations';
import buildYml from './builder/fileBuilder';

export default function run() {
  prompt(composeQuestions)
    .then(createServices)
    .then(({ serviceParams, composeInformation }) => buildYml(serviceParams, composeInformation));
}
