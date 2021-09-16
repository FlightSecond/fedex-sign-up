import { AbstractControl } from '@angular/forms';
import { checkForbiddenStrings, forbiddenStringsValidator } from './forbiddenStringsValidator';

describe('forbiddenStringsValidator', () => {
  it('should return null if no forbidden strings found', () => {
    const fakeAbstractControl = { value: 'test string' };

    expect(checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['some string'])).toBeNull();
    expect(
      checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['other string', 'second string', 'custom text'])
    ).toBeNull();
    expect(
      checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['test string with additional text'])
    ).toBeNull();
    expect(checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['string with additional text'])).toBeNull();
  });

  it('should return the forbiddenStrings boolean if string found', () => {
    const fakeAbstractControl = { value: 'Lorem ipsum' };

    expect(checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['Lorem ipsum'])).toEqual({
      forbiddenStrings: true,
    });
    expect(checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['Lorem'])).toEqual({
      forbiddenStrings: true,
    });
    expect(checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['Lorem', 'ipsum'])).toEqual({
      forbiddenStrings: true,
    });
    expect(
      checkForbiddenStrings(fakeAbstractControl as AbstractControl, ['other', 'string1', 'string2', 'ipsum'])
    ).toEqual({
      forbiddenStrings: true,
    });
  });

  it('should return null in edge cases', () => {
    expect(checkForbiddenStrings(null as unknown as AbstractControl, ['Lorem ipsum'])).toBeNull();
    expect(checkForbiddenStrings(null as unknown as AbstractControl, null as unknown as string[])).toBeNull();
    expect(
      checkForbiddenStrings({ value: 'Lorem ipsum' } as unknown as AbstractControl, null as unknown as string[])
    ).toBeNull();
    expect(checkForbiddenStrings({} as AbstractControl, ['Lorem ipsum'])).toBeNull();
    expect(checkForbiddenStrings({} as AbstractControl, null as unknown as string[])).toBeNull();
  });

  it('should expose the validator function', () => {
    expect(forbiddenStringsValidator).toBeDefined();
    expect(forbiddenStringsValidator(['test'])).toBeDefined();
    expect(forbiddenStringsValidator(['test'])({} as AbstractControl)).toBeDefined();
  });
});
