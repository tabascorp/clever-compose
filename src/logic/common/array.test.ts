import { expect } from 'chai';
import uniqueArray from './array';

describe('Function unique array', () => {
  describe('should return empty array', () => {
    it('when passed empty array', (done) => {
      expect(uniqueArray([])).to.deep.equal([]);
      done();
    });
  });

  describe('should return same array', () => {
    it('when passed array with only unique numbers', (done) => {
      expect(uniqueArray([4, 2, 6, 7, 1, 0, 9])).to.deep.equal([4, 2, 6, 7, 1, 0, 9]);
      done();
    });
  });

  describe('should return array with unique numbers', () => {
    it('when passed array with duplicated numbers', (done) => {
      expect(uniqueArray([4, 2, 2, 7, 1, 1, 1])).to.deep.equal([4, 2, 7, 1]);
      done();
    });
  });
});
