import { expect } from 'chai';
import { placeholder } from '../config/constants';
import {
  generateArrayOfKeyPlaceholders,
  generateArrayOfMapPlaceholders,
  generateArrayOfPlaceholders,
  generateArrayOfPlaceholdersWithColon,
} from './placeholderOperations';

describe('placeholderOperations', () => {
  describe('generateArrayOfPlaceholders', () => {
    describe('should return n placeholders array', () => {
      it('when n is passed as count', (done) => {
        expect(generateArrayOfPlaceholders(1)).to.deep.equal([placeholder]);
        expect(generateArrayOfPlaceholders(3)).to.deep.equal([
          placeholder,
          placeholder,
          placeholder,
        ]);
        expect(generateArrayOfPlaceholders(5)).to.deep.equal([
          placeholder,
          placeholder,
          placeholder,
          placeholder,
          placeholder,
        ]);
        done();
      });
    });
    describe('should return empty array', () => {
      it('when passed count is equal 0', (done) => {
        expect(generateArrayOfPlaceholders(0)).to.deep.equal([]);
        done();
      });
      it('when passed count is less than 0', (done) => {
        expect(generateArrayOfPlaceholders(-1)).to.deep.equal([]);
        expect(generateArrayOfPlaceholders(-7)).to.deep.equal([]);
        done();
      });
    });
  });

  describe('generateArrayOfPlaceholdersWithColon', () => {
    describe('should return n placeholders array', () => {
      it('when n is passed as count', (done) => {
        expect(generateArrayOfPlaceholdersWithColon(1)).to.deep.equal([`${placeholder}:`]);
        expect(generateArrayOfPlaceholdersWithColon(3)).to.deep.equal([
          `${placeholder}:`,
          `${placeholder}:`,
          `${placeholder}:`,
        ]);
        expect(generateArrayOfPlaceholdersWithColon(5)).to.deep.equal([
          `${placeholder}:`,
          `${placeholder}:`,
          `${placeholder}:`,
          `${placeholder}:`,
          `${placeholder}:`,
        ]);
        done();
      });
    });
    describe('should return empty array', () => {
      it('when passed count is equal 0', (done) => {
        expect(generateArrayOfPlaceholdersWithColon(0)).to.deep.equal([]);
        done();
      });
      it('when passed count is less than 0', (done) => {
        expect(generateArrayOfPlaceholdersWithColon(-1)).to.deep.equal([]);
        expect(generateArrayOfPlaceholdersWithColon(-7)).to.deep.equal([]);
        done();
      });
    });
  });

  describe('generateArrayOfMapPlaceholders', () => {
    describe('should return n placeholders array', () => {
      it('when n is passed as count', (done) => {
        expect(generateArrayOfMapPlaceholders(1)).to.deep.equal([`${placeholder}:${placeholder}`]);
        expect(generateArrayOfMapPlaceholders(3)).to.deep.equal([
          `${placeholder}:${placeholder}`,
          `${placeholder}:${placeholder}`,
          `${placeholder}:${placeholder}`,
        ]);
        expect(generateArrayOfMapPlaceholders(5)).to.deep.equal([
          `${placeholder}:${placeholder}`,
          `${placeholder}:${placeholder}`,
          `${placeholder}:${placeholder}`,
          `${placeholder}:${placeholder}`,
          `${placeholder}:${placeholder}`,
        ]);
        done();
      });
    });
    describe('should return empty array', () => {
      it('when passed count is equal 0', (done) => {
        expect(generateArrayOfMapPlaceholders(0)).to.deep.equal([]);
        done();
      });
      it('when passed count is less than 0', (done) => {
        expect(generateArrayOfMapPlaceholders(-1)).to.deep.equal([]);
        expect(generateArrayOfMapPlaceholders(-7)).to.deep.equal([]);
        done();
      });
    });
  });

  describe('generateArrayOfKeyPlaceholders', () => {
    describe('should return n placeholders array', () => {
      it('when n is passed as count', (done) => {
        expect(generateArrayOfKeyPlaceholders(1)).to.deep.equal([`KEY=${placeholder}`]);
        expect(generateArrayOfKeyPlaceholders(3)).to.deep.equal([
          `KEY=${placeholder}`,
          `KEY=${placeholder}`,
          `KEY=${placeholder}`,
        ]);
        expect(generateArrayOfKeyPlaceholders(5)).to.deep.equal([
          `KEY=${placeholder}`,
          `KEY=${placeholder}`,
          `KEY=${placeholder}`,
          `KEY=${placeholder}`,
          `KEY=${placeholder}`,
        ]);
        done();
      });
    });
    describe('should return empty array', () => {
      it('when passed count is equal 0', (done) => {
        expect(generateArrayOfKeyPlaceholders(0)).to.deep.equal([]);
        done();
      });
      it('when passed count is less than 0', (done) => {
        expect(generateArrayOfKeyPlaceholders(-1)).to.deep.equal([]);
        expect(generateArrayOfKeyPlaceholders(-7)).to.deep.equal([]);
        done();
      });
    });
  });
});
