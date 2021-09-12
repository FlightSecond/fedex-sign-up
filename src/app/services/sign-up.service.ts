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
    return this.http.post<SignUpApiResponse>(`${this.baseUrl}/users`, data);
  }
}
