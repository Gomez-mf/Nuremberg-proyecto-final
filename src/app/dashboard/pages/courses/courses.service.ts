import { Injectable } from '@angular/core';
import { course } from './models';
import { Observable, concatMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments.local';

@Injectable({ providedIn: 'root' })
export class coursesService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<course[]> {
    return this.http.get<course[]>(`${environment.baseUrl}/courses`);
  }

  createCourse(payload: course): Observable<course[]> {
    return this.http
      .post<course>(`${environment.baseUrl}/courses`, payload)
      .pipe(concatMap(() => this.getCourses()));
  }

  updateCourse(courseId: number, payload: course): Observable<course[]> {
    return this.http
      .put<course>(`${environment.baseUrl}/courses/${courseId}`, payload)
      .pipe(concatMap(() => this.getCourses()));
  }

  deleteCourse(courseId: number): Observable<course[]> {
    return this.http
      .delete<course>(`${environment.baseUrl}/courses/${courseId}`)
      .pipe(concatMap(() => this.getCourses()));
  }
}
