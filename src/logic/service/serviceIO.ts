import { readFileSync, writeFile, mkdirSync } from 'fs';
import { safeDump, load } from 'js-yaml';
import * as path from 'path';

import { prompt } from 'inquirer';
import { serviceExtractionQuestion } from './serviceQuestions';
import Compose, { ComposeData } from '../compose';

const templateFile = 'static/template-compose.yml';

function getServiceNames(composeData: ComposeData): string[] {
  return Object.keys(composeData.services);
}

export function saveServiceTemplates(
  templatePath: string,
  serviceNames: string[],
  compose: Compose,
) {
  serviceNames.forEach((service: string) => {
    const foo = readFileSync(templateFile, 'utf8');
    const composeYml = safeDump(compose[service], { skipInvalid: true });
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
