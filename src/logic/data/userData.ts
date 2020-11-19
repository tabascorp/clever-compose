import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { prompt } from 'inquirer';

const configBaseDir = path.join(os.homedir(), '.clever-compose');
const configFileName = 'settings.json';
const configPath = path.join(configBaseDir, configFileName);
const defaultTemplatesPath = path.join(os.homedir(), 'clever-compose', 'templates');

let templatesPath;

const createSettingsContent = () => ({
  templatesPath,
});

async function askForTemplatePath(): Promise<string> {
  const result = await prompt([{
    type: 'input',
    name: 'templatesPath',
    message: 'Set path for your templates',
    default: defaultTemplatesPath,
  }]);
  return result.templatesPath;
}

export async function loadUserData(): Promise<void> {
  if (fs.existsSync(configPath)) {
    return fs.promises.readFile(configPath, { encoding: 'utf8' })
      .then((fileBuffer) => {
        templatesPath = JSON.parse(fileBuffer).templatesPath;
      });
  }

  templatesPath = await askForTemplatePath();

  await fs.promises.mkdir((configBaseDir), { recursive: true });
  return fs.promises.writeFile(configPath, JSON.stringify(createSettingsContent()))
    .catch(console.error);
}

export default {
  templatesPath,
};
