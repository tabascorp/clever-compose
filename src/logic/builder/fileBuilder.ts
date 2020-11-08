import { writeFile } from 'fs';
import { safeDump } from 'js-yaml';
import generateComposeJson from './composeBuilder';

export default (services:string[], serviceInfo:any): void => {
  const composeJson = generateComposeJson(services, serviceInfo);
  const composeYml = safeDump(composeJson, { skipInvalid: true });
  writeFile('docker-compose.yml', composeYml, (err) => {
    if (err) {
      return console.warn(err);
    }
    return console.log('The file was saved!');
  });
};
