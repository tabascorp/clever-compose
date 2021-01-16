import { writeFile } from 'fs';
import { safeDump } from 'js-yaml';
import Compose from '.';

export default function saveCompose(compose: Compose) {
  const composeYml = safeDump(compose, { skipInvalid: true });

  writeFile('docker-compose.yml', composeYml, (err) => {
    if (err) {
      return console.warn(err);
    }
    return console.log('The file was saved!');
  });
}
