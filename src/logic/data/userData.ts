import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const configBaseDir = path.join(os.homedir(), '.clever-compose');
const configFileName = 'settings.json';
const configPath = path.join(configBaseDir, configFileName);
const defaultTemplatesPath = path.join(os.homedir(), 'clever-compose', 'templates');

const createSettingsContent = () => ({
  templatesPath: defaultTemplatesPath,
});

export function loadUserData(): Promise<void> {
  if (fs.existsSync(configPath)) {
    return Promise.resolve();
  }

  return fs.promises.mkdir((configBaseDir), { recursive: true })
    .then(() => fs.promises.writeFile(configPath, JSON.stringify(createSettingsContent())))
    .catch(console.error);
}

export default {
  templatesPath: undefined,
};
