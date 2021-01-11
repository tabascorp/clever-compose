/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import createAdditionalComponents from './additionalComponentOperations';
import { generateArrayOfPlaceholdersWithColon, generateArrayOfMapPlaceholders } from '../placeholder/placeholderOperations';

const additionalComponentsInfo = {
  'additional-components': [
    'networks',
    'volumes',
  ],
  'networks-quantity': '5',
  'volumes-quantity': '3',
};

const builtAdditionalComponents = {
  networks: generateArrayOfPlaceholdersWithColon(5),
  volumes: generateArrayOfMapPlaceholders(3),
};

describe('Additional Components Builder', () => {
  describe('should return empty object', () => {
    it('if empty object was passed', (done) => {
      expect(createAdditionalComponents({})).to.be.empty;
      done();
    });

    it('if no additional components info provided', (done) => {
      expect(createAdditionalComponents({
        additionalComponents: [],
      })).to.be.empty;
      done();
    });

    it('if all quantities are wrong', (done) => {
      const wrongCountAdditionalComponents = {
        ...additionalComponentsInfo,
      };
      delete wrongCountAdditionalComponents['networks-quantity'];
      delete wrongCountAdditionalComponents['volumes-quantity'];

      expect(createAdditionalComponents(wrongCountAdditionalComponents))
        .to.be.empty;
      done();
    });
  });

  describe('should return components with count', () => {
    it('if component information and count was passed', (done) => {
      expect(createAdditionalComponents(additionalComponentsInfo))
        .to.deep.equal(builtAdditionalComponents);
      done();
    });
  });

  describe('should return components only with correct count', () => {
    it('if component information has some wrong count was passed', (done) => {
      const wrongCountAdditionalComponents = {
        ...additionalComponentsInfo,
        'networks-quantity': '-1',
      };

      const wrongCountResult = {
        ...builtAdditionalComponents,
      };

      delete wrongCountResult.networks;

      expect(createAdditionalComponents(wrongCountAdditionalComponents))
        .to.deep.equal(wrongCountResult);
      done();
    });

    it('if component information has count missing', (done) => {
      const missingCountAdditionalComponents = {
        ...additionalComponentsInfo,
      };

      delete missingCountAdditionalComponents['networks-quantity'];

      const missingCountResult = {
        ...builtAdditionalComponents,
      };

      delete missingCountResult.networks;

      expect(createAdditionalComponents(missingCountAdditionalComponents))
        .to.deep.equal(missingCountResult);
      done();
    });
  });
});
