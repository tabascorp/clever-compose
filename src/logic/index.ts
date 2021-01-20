import { program } from 'commander';
import { prompt } from 'inquirer';
import saveCompose from './compose/composeIO';
import { processComposeData } from './compose/composeOperations';
import { askForServicesData } from './service/serviceOperations';
import { exportService } from './service/serviceIO';
import loadUserConfig from './config/configService';
import composeQuestions from './compose/composeQuestions';

const MINIMUM_ARGS_SIZE = 2;

function init() {
  prompt(composeQuestions)
    .then(askForServicesData)
    .then(processComposeData)
    .then(saveCompose);
}

function processArgs(args: string[]) {
  program
    .version('0.0.1')
    .option('-e, --extract <path>', 'extracts services from docker-compose', 'docker-compose.yml')
    .parse(args);
}

export default async function run() {
  if (process.argv.length <= MINIMUM_ARGS_SIZE) {
    await loadUserConfig();
    init();
  } else {
    processArgs(process.argv);

    const extractPath = program.extract;

    if (extractPath.length > 0) {
      exportService(extractPath);
    }
  }

  return Promise.resolve();
}
