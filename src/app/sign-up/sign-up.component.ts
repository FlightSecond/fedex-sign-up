import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SignUpService } from '../services/sign-up.service';
import { SignUpApiResponse } from '../services/sign-up-data.type';
import { forbiddenStringsValidator } from '../helpers/forbiddenStringsValidator';

const passwordInitialValidators = [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{8,}'),
];

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @ViewChild('form') form: ElementRef | undefined;
  apiError = false;
  loading = false;
  success = false;

  constructor(private signUpService: SignUpService) {}

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
    // Triggering the native HTML5 validation first
    this.form?.nativeElement.reportValidity();
    this.apiError = false;

    // Triggering the angular validation
    this.signUpForm.markAllAsTouched();

    // Checking the Angular validators
    if (!this.signUpForm.valid) {
      return;
    }

    this.loading = true;
    this.success = false;

    this.signUpService
      .postSignUpData(this.signUpForm.value)
      .pipe(
        // retryWhen with geometric / exponential delay
        // can be done here if the API can be potentially overloaded

        // Custom error handler can be done in separate service to throw an error to Sentry
        catchError((error: HttpErrorResponse) => throwError(`Sign-up API error: ${error.message}`)),

        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (data: SignUpApiResponse) => {
          // Possible next step: passing the subscriber ID to the database
          console.info(`Returned id: ${data._id}`);
          this.success = true;
          this.signUpForm.disable();
          return;
        },
        () => {
          this.apiError = true;
        }
      );
  }

  onReset(): void {
    this.apiError = false;
    this.loading = false;
    this.success = false;
    this.signUpForm.reset();
    this.signUpForm.enable();
  }

  get firstName(): AbstractControl | null {
    return this.signUpForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.signUpForm.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.signUpForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }
}
