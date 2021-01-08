import * as os from 'os';
import * as path from 'path';

export const configBaseDir = path.join(os.homedir(), '.clever-compose');
export const configFileName = 'settings.json';
export const placeholder = '~~~~~~~~';
export const defaultTemplatesPath = path.join(os.homedir(), 'clever-compose', 'templates');
export const configPath = path.join(configBaseDir, configFileName);
