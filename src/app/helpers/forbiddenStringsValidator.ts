import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const checkForbiddenStrings = (control: AbstractControl, strings: string[]): ValidationErrors | null => {
  if (!strings || strings.length === 0 || !control || !control.value) {
    return null;
  }
  const stringsFound = !!strings.find((stringItem) => control.value.indexOf(stringItem) !== -1);

  return stringsFound ? { forbiddenStringsFound: true } : null;
};

export const forbiddenStringsValidator =
  (strings: string[]): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null =>
    checkForbiddenStrings(control, strings);
