import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SignUpService } from './sign-up.service';

describe('SignUpService ', () => {
  let signUpService: SignUpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService],
    });

    signUpService = TestBed.inject(SignUpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return the server response if the posted data is correct', () => {
    const correctRequestString = `{\n  firstName: "John",\n  lastName: "Doe",\n  email: "john@doe.com"\n}`;
    const serverResponse = { _id: 'SomeValue' };

    signUpService.postSignUpData({ lastName: 'Doe', firstName: 'John', email: 'john@doe.com' }).subscribe((data) => {
      expect(data).toBe(serverResponse);
    });

    const signUpServiceRequest = httpTestingController.expectOne('https://demo-api.now.sh/users');
    expect(signUpServiceRequest.request.method).toBe('POST');
    expect(signUpServiceRequest.request.body).toBe(correctRequestString);
    signUpServiceRequest.flush(serverResponse);
  });
});
