import {
  readFileSync,
  writeFile,
  mkdirSync,
  readdirSync,
  existsSync,
} from 'fs';
import { safeDump, load } from 'js-yaml';
import * as path from 'path';

import { prompt } from 'inquirer';
import { serviceExtractionQuestion } from './serviceQuestions';
import Compose, { ComposeData } from '../compose';

import loadUserConfig from '../config/configService';

const templateFile = path.join(__dirname, '..', '..', '..', 'static', 'template-compose.yml');

function getServiceNames(composeData: ComposeData): string[] {
  return Object.keys(composeData.services);
}

export async function saveServiceTemplates(
  serviceNames: string[],
  compose: Compose,
) {
  const templatePath = await loadUserConfig();
  serviceNames.forEach((service: string) => {
    const foo = readFileSync(templateFile, 'utf8');
    const composeYml = safeDump(compose[service], { skipInvalid: true });
    const pathToSave = path.join(templatePath, `${service}.yml`);

    mkdirSync(templatePath, { recursive: true });

    writeFile(pathToSave, foo + composeYml, 'utf8', (err) => console.warn(err));
  });
}

export function exportService(filePath: string) {
  const composeAsJson = load(readFileSync(filePath, 'utf8'));
  const choices = getServiceNames(composeAsJson);

  prompt([
    serviceExtractionQuestion(choices),
  ]).then((answers) => {
    saveServiceTemplates(answers.services, composeAsJson.services);
  });
}

export async function listUserServiceTemplateNames(): Promise<string[]> {
  const templatePath = await loadUserConfig();

  if (!existsSync(templatePath)) {
    await mkdirSync((templatePath), { recursive: true });
  }

  const userTemplates = await readdirSync(templatePath);
  return userTemplates;
}

export async function loadServiceString(serviceTemplateName: string): Promise<string> {
  const templatePath = await loadUserConfig();
  const pathToTemplate = path.join(templatePath, serviceTemplateName);
  return readFileSync(pathToTemplate, 'utf8');
}
