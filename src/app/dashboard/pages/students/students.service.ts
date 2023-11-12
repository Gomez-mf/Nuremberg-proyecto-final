import { Inject, Injectable } from '@angular/core';
import { Student } from './models';
import { apiUrl, apiUrlConfig } from 'src/app/config/url.token';
import { BehaviorSubject, Observable, Subject, concatMap } from 'rxjs';
import { HttpClient} from "@angular/common/http"
import { environment } from 'src/enviroments/enviroments.local';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {

  constructor(private httpClient: HttpClient){}

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${environment.baseUrl}/students`)
  }

  createStudent(payload: Student): Observable<Student[]>{
    return this.httpClient
    .post<Student>(`${environment.baseUrl}/students`, payload)
    .pipe(concatMap(() => this.getStudents()));
  }

  updateStudent(studentId: number, payload: Student): Observable<Student[]>{
    return this.httpClient.put<Student>(`${environment.baseUrl}/students/${studentId}`, payload)
    .pipe(concatMap(() => this.getStudents()));
  }

  deleteStudent(studentId: number): Observable<Student[]>{
    return this.httpClient.delete<Student>(`${environment.baseUrl}/students/${studentId}`)
    .pipe(concatMap(() => this.getStudents()));
  }

}
