import { prompt } from 'inquirer';
import { composeQuestions } from './questions';
import createComposeFile from './compose';
import { loadUserData } from './data/userData';

export default function run() {
  loadUserData()
    .then(() => prompt(composeQuestions))
    .then(createComposeFile);
}
