import { writeFileSync } from 'fs';
import { safeDump } from 'js-yaml';
import Compose from '.';

export default function saveCompose(compose: Compose, path: string = 'docker-compose.yml') {
  const composeYml = safeDump(compose, { skipInvalid: true });
  writeFileSync(path, composeYml); // TODO change to async
}
