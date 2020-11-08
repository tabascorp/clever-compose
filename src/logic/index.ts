import { prompt } from 'inquirer';
import { composeQuestions } from './questions';
import createComposeFile from './compose';

export default function run() {
  prompt(composeQuestions)
    .then(createComposeFile);
}
