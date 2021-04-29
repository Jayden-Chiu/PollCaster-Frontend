import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageResponseModel } from './page-response.model';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl + '/api/polls';
  }

  getPolls(): Observable<PageResponseModel> {
    return this.http.get<PageResponseModel>(this.url, {
      params: new HttpParams({
        fromString: '_page=0&_size=20',
      }),
    });
  }
}
