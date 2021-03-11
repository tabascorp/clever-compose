import { program } from 'commander';
import { prompt } from 'inquirer';
import saveCompose from './compose/composeIO';
import { processComposeData } from './compose/composeOperations';
import { askForServicesData } from './service/serviceOperations';
import { exportService } from './service/serviceIO';
import { loadUserConfig, updateTemplatesPath } from './config/configService';
import composeQuestions from './compose/composeQuestions';

const EXTRACT = {
  short: '-e',
  long: '--extract',
};

function init() {
  prompt(composeQuestions)
    .then(askForServicesData)
    .then(processComposeData)
    .then(saveCompose);
}

function processArgs(args: string[]) {
  program
    .version('1.0.0')
    .option(`${EXTRACT.short}, ${EXTRACT.long} [path]`, 'extracts services from docker-compose', './docker-compose.yml')
    .option('-i, --ignore-tutorial', 'ignore tutorial how to modify service in file', false)
    .option('-s, --show-tpath', 'show current path for your templates', false)
    .option('-c, --change-tpath <new_path>', 'ignore tutorial how to modify service in file')
    .parse(args);
}

export default async function run() {
  processArgs(process.argv);

  if (program.showTpath) {
    const templatePath = await loadUserConfig();
    console.log(templatePath);
    return;
  }

  if (program.changeTpath !== undefined) {
    await updateTemplatesPath(program.changeTpath);
    return;
  }

  if (process.argv.includes(EXTRACT.short) || process.argv.includes(EXTRACT.long)) {
    const extractPath = program.extract;

    if (extractPath.length > 0) {
      exportService(extractPath, program.ignoreTutorial);
    }
    return;
  }

  await loadUserConfig();
  init();
}
