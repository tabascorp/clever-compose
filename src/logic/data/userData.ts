import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { prompt } from 'inquirer';

const configBaseDir = path.join(os.homedir(), '.clever-compose');
const configFileName = 'settings.json';
const configPath = path.join(configBaseDir, configFileName);
const defaultTemplatesPath = path.join(os.homedir(), 'clever-compose', 'templates');

async function askForTemplatePath(): Promise<string> {
  const result = await prompt([{
    type: 'input',
    name: 'templatesPath',
    message: 'Set path for your templates',
    default: defaultTemplatesPath,
  }]);
  return result.templatesPath;
}

export default async function (): Promise<string> {
  if (fs.existsSync(configPath)) {
    return fs.promises.readFile(configPath, { encoding: 'utf8' })
      .then((fileBuffer) => JSON.parse(fileBuffer).templatesPath);
  }

  const templatesPath = await askForTemplatePath();

  await fs.promises.mkdir((configBaseDir), { recursive: true });
  return fs.promises.writeFile(configPath, JSON.stringify({ templatesPath }))
    .then(() => templatesPath);
}
