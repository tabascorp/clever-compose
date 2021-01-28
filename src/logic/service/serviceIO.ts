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
import { templateComment } from '../../../static/compose-data.json';

import { loadUserConfig } from '../config/configService';

function getServiceNames(composeData: ComposeData): string[] {
  return Object.keys(composeData.services);
}

export async function saveServiceTemplates(
  serviceNames: string[],
  compose: Compose,
  ignore: boolean = false,
) {
  const templatePath = await loadUserConfig();
  serviceNames.forEach((service: string) => {
    let data = '';

    if (!ignore) {
      data = `${templateComment}\n`;
    }

    const composeYml = safeDump(compose[service], { skipInvalid: true });
    data = data.concat(composeYml);

    const pathToSave = path.join(templatePath, `${service}.yml`);

    mkdirSync(templatePath, { recursive: true });

    writeFile(pathToSave, data, 'utf8', (error) => {
      if (error !== null) {
        console.error(error);
      } else {
        console.log(`Template saved in: ${pathToSave}`);
      }
    });
  });
}

export function exportService(filePath: string, ignore: boolean) {
  const composeAsJson = load(readFileSync(filePath, 'utf8'));
  const choices = getServiceNames(composeAsJson);

  prompt([
    serviceExtractionQuestion(choices),
  ]).then((answers) => {
    saveServiceTemplates(answers.services, composeAsJson.services, ignore);
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
