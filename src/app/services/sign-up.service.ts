import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignUpApiResponse, SignUpData } from './sign-up-data.type';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  baseUrl = 'https://demo-api.now.sh';

  constructor(private http: HttpClient) {}

  postSignUpData(data: SignUpData): Observable<SignUpApiResponse> {
    // According to the task, the data should have no quotes around the keys,
    // I did it manually, but it can be done using external libs, like this:
    // https://www.npmjs.com/package/stringify-object

    // We are not sending the password as it's not listed in the task description.
    return this.http.post<SignUpApiResponse>(
      `${this.baseUrl}/users`,
      `{\n  firstName: "${data.firstName}",\n  lastName: "${data.lastName}",\n  email: "${data.email}"\n}`
    );
  }
}
