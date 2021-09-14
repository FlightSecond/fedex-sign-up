import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const forbiddenStringsValidator =
  (strings: string[]): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!strings || strings.length === 0 || !control.value) {
      return null;
    }
    const stringsFound = !!strings.find((stringItem) => control.value.indexOf(stringItem) !== -1);

    return stringsFound ? { forbiddenStrings: { value: control.value } } : null;
  };
