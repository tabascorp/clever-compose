import { prompt } from 'inquirer';
import { composeQuestions } from './questions';
import askForServiceComponents from './compose';
import buildYml from './builder/fileBuilder';

export default function run() {
    prompt(composeQuestions)
      .then(askForServiceComponents)
      .then(({serviceParams, composeInformations}) => buildYml(serviceParams, composeInformations));
}
