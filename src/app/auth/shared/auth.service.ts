import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request';
import { LoginResponsePayload } from '../login/login-response';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.url = environment.baseUrl + '/api/auth';
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(this.url + '/signup', signupRequestPayload, {
      responseType: 'json',
    });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http
      .post<LoginResponsePayload>(this.url + '/login', loginRequestPayload)
      .pipe(map((data) => {
        this.localStorage.store('accessToken', data.accessToken);
        this.localStorage.store('tokenType', data.tokenType);

        this.loggedIn.emit(true);
        return true;
      }));
  }

  authenticated(): Observable<boolean> {
    return this.http.get<boolean>(this.url + '/authenticated');
  }
}
