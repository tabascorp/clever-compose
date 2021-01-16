import * as fs from 'fs';

import { prompt } from 'inquirer';
import setTemplatePathQuestion from './configQuestions';
import { configPath, configBaseDir } from './constants';

async function askForTemplatePath(): Promise<string> {
  const result = await prompt([setTemplatePathQuestion]);
  return result.templatesPath;
}

export default async function loadUserConfig(): Promise<string> {
  if (fs.existsSync(configPath)) {
    return fs.promises.readFile(configPath, { encoding: 'utf8' })
      .then((fileBuffer) => JSON.parse(fileBuffer).templatesPath);
  }

  const templatesPath = await askForTemplatePath();

  await fs.promises.mkdir((configBaseDir), { recursive: true });
  return fs.promises.writeFile(configPath, JSON.stringify({ templatesPath }))
    .then(() => templatesPath);
}
