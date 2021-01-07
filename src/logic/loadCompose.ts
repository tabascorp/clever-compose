/**
 * https://www.npmjs.com/package/js-yaml
 */
import { readFile, readFileSync, appendFile, writeFile, mkdirSync } from 'fs';
import { load, safeDump } from 'js-yaml';
import { prompt } from 'inquirer';
import * as path from 'path';

const templateFile = 'static/template-compose.yml';

const selectService = function (choices: Record<string, any>) {
  return {
    type: 'checkbox',
    message: 'Select services to extract',
    name: 'services',
    choices: choices,
  }
}

export default function run(templatePath: string, filePath: string) {
  
  const composeAsJson = load(readFileSync(filePath, 'utf8'));
  const choices = getServiceNames(composeAsJson);

  prompt([
    selectService(choices),
  ])
  .then( (answers) => {
    saveServiceTemplates(templatePath, answers['services'], composeAsJson['services']);
  });

}

function getServiceNames(composeData: Record<string, any>): string[] {
  return Object.keys(composeData.services);
}

function saveServiceTemplates(templatePath: string, serviceNames: string[], composeAsJson: Record<string, any>) {

  serviceNames.forEach((service: string) => {
    const foo = readFileSync(templateFile, 'utf8');
    const composeYml = safeDump(composeAsJson[service], { skipInvalid: true });
    const pathToFile = path.join(templatePath, `${service}.yml`);

    mkdirSync(templatePath, { recursive: true });

    writeFile(pathToFile, foo + composeYml, 'utf8', (err) => {
      if (err) {
        return console.warn(err);
      }
    });
  });
} 