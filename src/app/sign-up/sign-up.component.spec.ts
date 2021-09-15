import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SignUpService } from '../services/sign-up.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpComponent: SignUpComponent;
  let mockSignUpService: jasmine.SpyObj<SignUpService>;
  const fakeUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: 'CorrectPassword',
  };

  beforeEach(async () => {
    mockSignUpService = jasmine.createSpyObj('SignUpService', ['postSignUpData']);

    await TestBed.configureTestingModule({
      providers: [{ provide: SignUpService, useValue: mockSignUpService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    signUpComponent = fixture.componentInstance;
  });

  it('should have empty fields and no errors on init', () => {
    expect(signUpComponent.signUpForm.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    expect(signUpComponent.apiError).toBeFalsy();
    expect(signUpComponent.loading).toBeFalsy();
    expect(signUpComponent.success).toBeFalsy();
  });

  it('sould reset the form if onReset called', () => {
    signUpComponent.signUpForm.setValue(fakeUser);
    signUpComponent.apiError = true;
    signUpComponent.loading = true;
    signUpComponent.success = true;

    signUpComponent.onReset();

    expect(signUpComponent.signUpForm.value).toEqual({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    });
    expect(signUpComponent.apiError).toBeFalsy();
    expect(signUpComponent.loading).toBeFalsy();
    expect(signUpComponent.success).toBeFalsy();
  });

  it('should submit valid form', () => {
    signUpComponent.signUpForm.setValue(fakeUser);
    mockSignUpService.postSignUpData.and.returnValue(of({ _id: 'fakeUserId123' }));

    signUpComponent.onSubmit();

    expect(mockSignUpService.postSignUpData).toHaveBeenCalled();
  });

  it(`should't submit empty form`, () => {
    signUpComponent.onSubmit();

    expect(mockSignUpService.postSignUpData).not.toHaveBeenCalled();
  });

  it('should show an API error on bad request', () => {
    const errorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
    });

    signUpComponent.signUpForm.setValue(fakeUser);
    mockSignUpService.postSignUpData.and.returnValue(throwError(errorResponse));
    signUpComponent.onSubmit();
    expect(signUpComponent.apiError).toBeTruthy();
  });

  it('should change password pattern on firstName or lastName change', () => {
    const spyChangePasswordPattern = spyOn(SignUpComponent.prototype, 'changePasswordPattern').and.callThrough();

    signUpComponent.ngOnInit();

    signUpComponent.signUpForm.controls['firstName'].setValue('test');
    expect(spyChangePasswordPattern).toHaveBeenCalled();
    expect(spyChangePasswordPattern).toHaveBeenCalledTimes(1);

    signUpComponent.signUpForm.controls['lastName'].setValue('test');
    expect(spyChangePasswordPattern).toHaveBeenCalledTimes(2);
  });

  it('should return fields', () => {
    signUpComponent.signUpForm.setValue(fakeUser);

    expect(signUpComponent.firstName).toBeDefined();
    expect(signUpComponent.firstName?.value).toBe('John');

    expect(signUpComponent.lastName).toBeDefined();
    expect(signUpComponent.lastName?.value).toBe('Doe');

    expect(signUpComponent.email).toBeDefined();
    expect(signUpComponent.email?.value).toBe('john@doe.com');

    expect(signUpComponent.password).toBeDefined();
    expect(signUpComponent.password?.value).toBe('CorrectPassword');
  });
});
