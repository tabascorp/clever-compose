import { writeFile } from 'fs/promises';
import { safeDump } from 'js-yaml';
import Compose from '.';

export default async function saveCompose(compose: Compose, path: string = 'docker-compose.yml') {
  if (compose === undefined) {
    return;
  }
  const composeYml = safeDump(compose, { skipInvalid: true });
  await writeFile(path, composeYml);
}
