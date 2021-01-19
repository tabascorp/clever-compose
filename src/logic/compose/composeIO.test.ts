// import mock from 'mock-fs';
import { expect } from 'chai';
import { join } from 'path';
import { readFileSync } from 'fs';
import { tmpdir } from 'os';
import Compose from '.';
import saveCompose from './composeIO';

const mock = require('mock-fs');

beforeEach(() => {
  mock({
    'docker-compose.yml': '',
  });
});

afterEach(mock.restore);

describe('Saving compose', () => {
  describe('should save compose to file', () => {
    it('when provided correct compose', (done) => {
      saveCompose(new Compose(3.8, {}, {}, {}), join(tmpdir(), 'docker-compose.yml'));
      expect(readFileSync(join(tmpdir(), 'docker-compose.yml'), { encoding: 'utf8', flag: 'r' }))
        .to.equal('version: 3.8\nservices: {}\nvolumes: {}\nnetworks: {}\n'); // TODO change to async

      done();
    });
  });
});
