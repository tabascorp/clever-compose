import { program } from 'commander';
import saveCompose from './compose/composeIO';
import { askForComposeData, processComposeData } from './compose/composeOperations';
import { askForServiceData } from './service/serviceOperations';
import { exportService } from './service/serviceIO';
import loadUserConfig from './config/configService';

const MINIMUM_ARGS_SIZE = 2;

function init() {
  askForComposeData()
    .then(askForServiceData)
    .then(processComposeData)
    .then(saveCompose);
}

function processArgs(args: string[]) {
  console.log(args);
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
}
