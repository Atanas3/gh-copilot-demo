import { describe, it } from 'mocha';
import { expect } from 'chai';
import {
  isValidAlbumTitle,
  isValidArtistName,
  isValidReleaseYear,
  parseFrenchDate,
  isValidGUID,
    isValidIPv6
} from './validators';

describe('validators', () => {
  describe('isValidAlbumTitle', () => {
    it('should validate non-empty, <100 char titles', () => {
      expect(isValidAlbumTitle('Test Album')).to.be.true;
      expect(isValidAlbumTitle('')).to.be.false;
      expect(isValidAlbumTitle(' '.repeat(101))).to.be.false;
    });
    it('should reject whitespace-only titles', () => {
      expect(isValidAlbumTitle('   ')).to.be.false;
    });
    it('should accept exactly 100 characters', () => {
      expect(isValidAlbumTitle('a'.repeat(100))).to.be.true;
    });
  });

  describe('isValidArtistName', () => {     
    it('should validate non-empty, <50 char artist names', () => {
      expect(isValidArtistName('Artist')).to.be.true;
      expect(isValidArtistName('')).to.be.false;
      expect(isValidArtistName(' '.repeat(51))).to.be.false;
    });
    it('should reject whitespace-only artist names', () => {
      expect(isValidArtistName('   ')).to.be.false;
    });
    it('should accept exactly 50 characters', () => {
      expect(isValidArtistName('b'.repeat(50))).to.be.true;
    });
  });

  describe('isValidReleaseYear', () => {
    it('should validate years between 1900 and current year', () => {
      expect(isValidReleaseYear(1999)).to.be.true;
      expect(isValidReleaseYear(1899)).to.be.false;
      expect(isValidReleaseYear(new Date().getFullYear() + 1)).to.be.false;
      expect(isValidReleaseYear(2020.5)).to.be.false;
    });
    it('should reject non-integer and string years', () => {
      expect(isValidReleaseYear(NaN)).to.be.false;
      expect(isValidReleaseYear(Number('2020'))).to.be.true;
      // @ts-expect-error
      expect(isValidReleaseYear('2020')).to.be.false;
    });
  });

  describe('parseFrenchDate', () => {
    it('should parse valid DD/MM/YYYY dates', () => {
      const d = parseFrenchDate('25/12/2020');
      expect(d).to.be.an.instanceof(Date);
      expect(d?.getFullYear()).to.equal(2020);
      expect(d?.getMonth()).to.equal(11); // December
      expect(d?.getDate()).to.equal(25);
    });
    it('should return null for invalid dates', () => {
      expect(parseFrenchDate('31/02/2020')).to.be.null;
      expect(parseFrenchDate('99/99/9999')).to.be.null;
      expect(parseFrenchDate('2020-12-25')).to.be.null;
    });
    it('should handle leap years correctly', () => {
      expect(parseFrenchDate('29/02/2020')).to.not.be.null; // valid leap year
      expect(parseFrenchDate('29/02/2019')).to.be.null; // not a leap year
    });
    it('should reject empty and nonsense strings', () => {
      expect(parseFrenchDate('')).to.be.null;
      expect(parseFrenchDate('abcd')).to.be.null;
    });
  });

  describe('isValidGUID', () => {
    it('should validate correct GUID/UUID strings', () => {
      expect(isValidGUID('123e4567-e89b-12d3-a456-426614174000')).to.be.true;
      expect(isValidGUID('123e4567-e89b-12d3-a456-42661417400Z')).to.be.false;
      expect(isValidGUID('not-a-guid')).to.be.false;
    });
    it('should reject empty and short/long strings', () => {
      expect(isValidGUID('')).to.be.false;
      expect(isValidGUID('123e4567-e89b-12d3-a456-42661417400')).to.be.false;
      expect(isValidGUID('123e4567-e89b-12d3-a456-4266141740000')).to.be.false;
    });
  });

  describe('isValidIPv6', () => {
    it('should validate correct IPv6 addresses', () => {
      expect(isValidIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).to.be.true;
      expect(isValidIPv6('2001:db8::8a2e:370:7334')).to.be.true;
      expect(isValidIPv6('::1')).to.be.true;
      expect(isValidIPv6('not:an:ipv6')).to.be.false;
      expect(isValidIPv6('123.123.123.123')).to.be.false;
    });
    it('should reject empty, too short, and too long addresses', () => {
      expect(isValidIPv6('')).to.be.false;
      expect(isValidIPv6('::')).to.be.true; // technically valid
      expect(isValidIPv6('1:2:3:4:5:6:7')).to.be.false;
      expect(isValidIPv6('1:2:3:4:5:6:7:8:9')).to.be.false;
    });
  });
});