import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

const passwordInitialValidators = [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{8,}'),
];

const forbiddenStringsValidator =
  (strings: string[]): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const stringsFound = !!strings.find((stringItem) => control.value.indexOf(stringItem) !== -1);

    return stringsFound ? { forbiddenStrings: { value: control.value } } : null;
  };

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', passwordInitialValidators),
  });

  changePasswordPattern(): void {
    const firstName = this.signUpForm.controls['firstName'].value;
    const lastName = this.signUpForm.controls['lastName'].value;

    this.signUpForm.controls['password']?.clearValidators();
    this.signUpForm.controls['password']?.setValidators([
      ...passwordInitialValidators,
      forbiddenStringsValidator([firstName, lastName]),
    ]);

    this.signUpForm.controls['password'].updateValueAndValidity();
  }

  ngOnInit(): void {
    this.signUpForm.controls['firstName']?.valueChanges.subscribe(this.changePasswordPattern.bind(this));
    this.signUpForm.controls['lastName']?.valueChanges.subscribe(this.changePasswordPattern.bind(this));
  }

  onSubmit(): void {
    this.signUpForm.controls['password'].disable();

    console.log('Valid?', this.signUpForm.valid); // true or false
    console.log('First name', this.signUpForm.value.firstName);
    console.log('Last name', this.signUpForm.value.lastName);
    console.log('Email', this.signUpForm.value.email);
    console.log('Password', this.signUpForm.value.password);
  }
}
