// import mock from 'mock-fs';
import { expect } from 'chai';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { tmpdir } from 'os';
import { safeLoad } from 'js-yaml';
import Compose from '.';
import saveCompose from './composeIO';

const mock = require('mock-fs');

function dummyCompose(): Compose {
  return new Compose(
    3.8,
    {
      database: {
        build: {
          context: '~~~~~~~~',
          labels: '~~~~~~~~',
          network: '~~~~~~~~',
          shm_size: '~~~~~~~~',
        },
        cap_add: ['~~~~~~~~'],
        container_name: '~~~~~~~~',
        depends_on: [
          '~~~~~~~~',
          '~~~~~~~~',
          '~~~~~~~~',
        ],
        env_file: [
          '~~~~~~~~',
          '~~~~~~~~',
        ],
        expose: [
          '~~~~~~~~',
        ],
        links: [
          '~~~~~~~~',
          '~~~~~~~~',
          '~~~~~~~~',
          '~~~~~~~~',
        ],
        ports: [
          '~~~~~~~~:~~~~~~~~',
          '~~~~~~~~:~~~~~~~~',
          '~~~~~~~~:~~~~~~~~',
        ],
        restart: 'no|always|on-failure|unless-stopped',
        volumes: [
          '~~~~~~~~:~~~~~~~~',
          '~~~~~~~~:~~~~~~~~',
        ],
      },
    },
    ['~~~~~~~~:~~~~~~~~'],
    ['~~~~~~~~:', '~~~~~~~~:', '~~~~~~~~:'],
  );
}

beforeEach(() => {
  mock({
    'docker-compose.yml': '',
  });
});

afterEach(mock.restore);

describe('#saveCompose()', () => {
  describe('save compose to file', () => {
    it('when provided compose with version only', async () => {
      await saveCompose(new Compose(3.8, {}, {}, {}), join(tmpdir(), 'docker-compose.yml'));
      const data = await readFile(join(tmpdir(), 'docker-compose.yml'), { encoding: 'utf8', flag: 'r' });
      expect(data).to.equal('version: 3.8\nservices: {}\nvolumes: {}\nnetworks: {}\n');
    });

    it('when provided complex compose', async () => {
      const dummy = dummyCompose();
      await saveCompose(dummy, join(tmpdir(), 'docker-compose.yml'));
      const data = await readFile(join(tmpdir(), 'docker-compose.yml'), { encoding: 'utf8', flag: 'r' });
      const jsonData = safeLoad(data);

      expect(jsonData).to.deep.equal(dummy);
      expect(Object.keys(jsonData)).to.be.deep.equal(['version', 'services', 'volumes', 'networks']);
    });
  });

  describe('do not create file', () => {
    it('when passed undefined', async () => {
      await saveCompose(undefined, join(tmpdir(), 'docker-compose.yml'));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(existsSync(join(tmpdir(), 'docker-compose.yml'))).to.be.false;
    });
  });
});
