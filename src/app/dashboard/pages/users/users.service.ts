import { Inject, Injectable } from '@angular/core';
import { users } from './models';
import { apiUrl, apiUrlConfig } from 'src/app/config/url.token';
import { BehaviorSubject, Observable, Subject, concatMap } from 'rxjs';
import { HttpClient} from "@angular/common/http"
import { environment } from 'src/enviroments/enviroments.local';

@Injectable({
  providedIn: 'root',
})
export class usersService {

  constructor(private httpClient: HttpClient){}

  getUsers(): Observable<users[]>{
    return this.httpClient.get<users[]>(`${environment.baseUrl}/users`)
  }

  createUsers(payload: users): Observable<users[]>{
    return this.httpClient
    .post<users>(`${environment.baseUrl}/users`, payload)
    .pipe(concatMap(() => this.getUsers()));
  }

  updateUsers(userId: number, payload: users): Observable<users[]>{
    return this.httpClient.put<users>(`${environment.baseUrl}/users/${userId}`, payload)
    .pipe(concatMap(() => this.getUsers()));
  }

  deleteUsers(userId: number): Observable<users[]>{
    return this.httpClient.delete<users>(`${environment.baseUrl}/users/${userId}`)
    .pipe(concatMap(() => this.getUsers()));
  }

}