import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseModel } from './api-response.model';
import { PageResponseModel } from './page-response.model';
import { catchError, map, tap } from 'rxjs/operators';
import { PollRequestPayload } from './poll-request';

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

  getPollsByUser(userId: number): Observable<PageResponseModel> {
    return this.http.get<PageResponseModel>(this.url + `/user/${userId}`, {
      params: new HttpParams({
        fromString: '_page=0&_size=20',
      }),
    });
  }

  votePoll(pollId: number): Observable<any> {
    return this.http.post(this.url + `/${pollId}/vote`, null, {
      responseType: 'json',
    });
  }

  deletePoll(pollId: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(this.url + `/${pollId}`);
  }

  createPoll(
    pollRequestPayload: PollRequestPayload
  ): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.url, pollRequestPayload);
  }
}
