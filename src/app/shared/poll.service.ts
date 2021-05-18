import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseModel } from './api-response.model';
import { PageResponseModel } from './page-response.model';
import { catchError, map, tap } from 'rxjs/operators';
import { PollRequestPayload } from './poll-request';
import { VoteRequestPayload } from './vote-request';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl + '/api/polls';
  }

  getPolls(page: number, size: number): Observable<PageResponseModel> {
    return this.http.get<PageResponseModel>(
      this.url + `?page=${page}&size=${size}`
    );
  }

  getPollsByUser(
    userId: number,
    page: number,
    size: number
  ): Observable<PageResponseModel> {
    return this.http.get<PageResponseModel>(
      this.url + `/user/${userId}?page=${page}&size=${size}`
    );
  }

  votePoll(pollId: number, voteRequestPayload: VoteRequestPayload): Observable<any> {
    return this.http.post(this.url + `/${pollId}/vote`, voteRequestPayload, {
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
