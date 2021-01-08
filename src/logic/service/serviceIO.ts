import { readFileSync, writeFile, mkdirSync } from 'fs';
import { safeDump, load } from 'js-yaml';
import * as path from 'path';

import { prompt } from 'inquirer';
import { serviceExtractionQuestion } from './serviceQuestions';

const templateFile = 'static/template-compose.yml';

function getServiceNames(composeData: Record<string, any>): string[] {
  return Object.keys(composeData.services);
}

export function saveServiceTemplates(
  templatePath: string, serviceNames: string[], composeAsJson: Record<string, any>,
) {
  serviceNames.forEach((service: string) => {
    const foo = readFileSync(templateFile, 'utf8');
    const composeYml = safeDump(composeAsJson[service], { skipInvalid: true });
    const pathToSave = path.join(templatePath, `${service}.yml`);

    mkdirSync(templatePath, { recursive: true });

    writeFile(pathToSave, foo + composeYml, 'utf8', (err) => console.warn(err));
  });
}

export function exportService(templatePath: string, filePath: string) {
  const composeAsJson = load(readFileSync(filePath, 'utf8'));
  const choices = getServiceNames(composeAsJson);

  prompt([
    serviceExtractionQuestion(choices),
  ]).then((answers) => {
    saveServiceTemplates(templatePath, answers.services, composeAsJson.services);
  });
}
