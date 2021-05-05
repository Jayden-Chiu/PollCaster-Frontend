import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl + '/api/users';
  }

  getUserById(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.url + `/${userId}`);
  }
}
